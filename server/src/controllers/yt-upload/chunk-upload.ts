import axios from 'axios';
import got from 'got';
import { publishVideoQueue, thumbnailUploadQueue, youtubeUploadQueue } from '../../lib/bullmq';
import { JobData, YOUTUBE_UPLOAD_TYPES } from '../../types/types';


interface UploadChunkParams extends JobData {

  onProgress: (percent: number) => void;
}

export const uploadChunkedVideoToYouTube = async ({
  onProgress,
  ...jobDataValues
}: UploadChunkParams): Promise<void> => {
  let currentByte = jobDataValues.startByte;

  while (currentByte < jobDataValues.fileSize) {
    const endByte = Math.min(currentByte + jobDataValues.chunkSize - 1, jobDataValues.fileSize - 1);
    const contentLength = endByte - currentByte + 1;

    console.log(`🚚 Uploading chunk ${currentByte} → ${endByte}`);

    const headers = {
      Authorization: `Bearer ${jobDataValues.accessToken}`,
      'Content-Length': contentLength,
      'Content-Type': `${jobDataValues.mimeType}`,
      'Content-Range': `bytes ${currentByte}-${endByte}/${jobDataValues.fileSize}`
    };

    const stream = got.stream(jobDataValues.videoUrl, {
      headers: {
        Range: `bytes=${currentByte}-${endByte}`
      }
    });

    try {
      const response = await axios({
        method: 'put',
        url: jobDataValues.uploadUrl,
        headers,
        data: stream,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: () => true,
      });

      if (response.status === 308) {
        currentByte = parseInt(response.headers.range?.split('-')[1] ?? '0', 10) + 1;
      } else if (response.status === 201 || response.status === 200) {
        console.log("response data", response.data);
        console.log('✅ Final chunk uploaded');
        const videoId = response.data.id;
        console.log('Video ID:', videoId);
        if (!videoId) {
          throw new Error("Video ID not found in response data");
        }

        await thumbnailUploadQueue.add(YOUTUBE_UPLOAD_TYPES.THUMBNAIL_UPLOAD, {
          videoId,
          ...jobDataValues
        }, {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
          removeOnFail: true,
        })

        break;

      } else {
        console.error('⚠️ Unexpected status:', response.status);
        throw new Error(`Unexpected status code: ${response.status}`);
      }

      // 🔁 Report progress
      const percent = Math.round((currentByte / jobDataValues.fileSize) * 100);
      onProgress(percent);

    } catch (err) {
      console.error('Chunk upload failed:', err);
      throw err;
    }
  }
};

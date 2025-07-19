import axios from 'axios';
import got from 'got';


interface UploadChunkParams {
  uploadUrl: string;
  videoUrl: string;
  chunkSize: number;
  startByte?: number;
  accessToken: string;
  mimeType: string;
  fileSize: number;
  onProgress: (percent: number) => void;
}

export const uploadChunkedVideoToYouTube = async ({
  uploadUrl,
  videoUrl,
  chunkSize,
  startByte = 0,
  accessToken,
  mimeType,
  fileSize,
  onProgress
}: UploadChunkParams): Promise<void> => {
  let currentByte = startByte;

  while (currentByte < fileSize) {
    const endByte = Math.min(currentByte + chunkSize - 1, fileSize - 1);
    const contentLength = endByte - currentByte + 1;

    console.log(`🚚 Uploading chunk ${currentByte} → ${endByte}`);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Length': contentLength,
      'Content-Type': `${mimeType}`, // You can make this dynamic
      'Content-Range': `bytes ${currentByte}-${endByte}/${fileSize}`
    };

    // 🌩️ Stream from Cloudinary using `got.stream` instead of downloading locally
    const stream = got.stream(videoUrl, {
      headers: {
        Range: `bytes=${currentByte}-${endByte}`
      }
    });

    try {
      const response = await axios({
        method: 'put',
        url: uploadUrl,
        headers,
        data: stream,
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: () => true,
      });

      if (response.status === 308) {
        currentByte = parseInt(response.headers.range?.split('-')[1] ?? '0', 10) + 1;
      } else if (response.status === 201 || response.status === 200) {
        console.log('✅ Final chunk uploaded');
        break;
      } else {
        console.error('⚠️ Unexpected status:', response.status);
        throw new Error(`Unexpected status code: ${response.status}`);
      }

      // 🔁 Report progress
      const percent = Math.round((currentByte / fileSize) * 100);
      onProgress(percent);

    } catch (err) {
      console.error('❌ Chunk upload failed:', err);
      throw err;
    }
  }
};

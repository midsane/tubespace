import { VideoMetadata } from "../types/types";

export const buildYouTubeMetadata = (
  title: string,
  description: string,
  tags: string[] = [],
  madeForKids: boolean
): VideoMetadata => ({
  snippet: {
    title,
    description,
    tags,
    categoryId: 22,
  },
  status: {
    privacyStatus: 'private',
    embeddable: true,
    license: 'youtube',
    madeForKids,
  },
});



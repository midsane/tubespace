import { Rating_val, Role } from "@prisma/client";
import { Request } from "express";

export interface TopEditorsData {
      name: string;
      bio?: string | null;
      profileImgUrl?: string | null;
      tasksCompleted: number;
      ratings: Rating_val;
      id: number;
      score: number;
      role: Role
}

export interface TopYoutubersData {
      name: string;
      bio?: string | null;
      profileImgUrl?: string | null;
      id: number;
      videosUploaded: number
      role: Role
}


export interface customRequest extends Request {
      user: {
            id: number;
            name: string;
            email: string;
            role: Role;
      }
}


export interface VideoMetadata {
      snippet: {
            title: string;
            description: string;
            tags?: string[];
            categoryId: string;
      };
      status: {
            privacyStatus: string;
            embeddable: boolean;
            license: string;
            madeForKids: boolean;
      };
}

export interface JobData {
      taskId: number;
      youtuberId: number;
      uploadUrl: string;
      mimeType: string;
      accessToken: string;
      chunkSize: number;
      startByte: number;
      videoUrl: string;
      fileSize: number;
      title: string;
      description: string;
      tags?: string[];
      madeForKids: boolean;
}

export enum YOUTUBE_UPLOAD_TYPES {
      VIDEO_UPLOAD = "video-upload",
      THUMBNAIL_UPLOAD = "thumbnail-upload",
      PUBLISH_VIDEO = "publish-video",
}
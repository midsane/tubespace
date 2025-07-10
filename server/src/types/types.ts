import { Rating_val, Role } from "@prisma/client";

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

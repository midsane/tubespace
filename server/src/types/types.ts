import { Rating_val } from "@prisma/client";

export interface TopEditorsData {
      name: string ;
      bio?: string | null;
      profileImgUrl?: string | null;
      tasksCompleted: number;
      ratings: Rating_val; 
      id: number; 
      score: number;
}

export interface TopYoutubersData {
      name: string ;
      bio?: string | null;
      profileImgUrl?: string | null;
      id: number;
      videosUploaded: number
}

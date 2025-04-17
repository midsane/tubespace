export interface PersonEntry {
    id: number,
    name?: string | null,
    profilepic?: string | null,
    username?: string,
}

export interface ChatEntry {
    chatId: number | string,
    from: string,
    to: string,
    message: string,
    isRead: boolean,
    createdAt: string,
    status?: MESSAGE_STATUS,
}


export enum MESSAGE_STATUS {
    UNSENT = "UNSENT",
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ"
}

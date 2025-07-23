export enum UploadSocketEvent {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    CONNECT_ERROR = "connect_error",
    UPLOAD_PROGRESS = "upload_progress",
    UPLOAD_COMPLETE = "upload_complete",
    UPLOAD_FAILED = "upload_failed", 
    THUMBNAIL_UPLOADED = "thumbnail_uploaded",
    THUMBNAIL_UPLOAD_FAILED = "thumbnail_upload_failed",
    PUBLISH_VIDEO = "publish_video",
    PUBLISH_VIDEO_FAILED = "publish_video_failed",
}

export enum ChatSocketEvents {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    CONNECT_ERROR = "connect_error",
    MESSAGE_RECEIVED = "message_received",
    MESSAGE_SENT = "message_sent",
    TYPING = "typing",
    STOP_TYPING = "stop_typing",
}
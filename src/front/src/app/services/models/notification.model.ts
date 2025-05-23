export interface NotificationResponse {
  statusCode: number;
  message: string;
  data: NotificationData;
}

export interface NotificationData {
  isSuccess: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  role: string;
  isRead: boolean;
  sentAt: Date;
}

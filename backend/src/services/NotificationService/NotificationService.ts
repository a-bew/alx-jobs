import { Types } from 'mongoose';
import notificationModel, { INotification, NotificationPriority, NotificationType } from '../../database/Notification';
export class NotificationService {

  // Private method to serialize notification data
  private convertNotificationDocToNotification(notificationDoc: any) {
    return {
      id: notificationDoc._id.toString(),
      title: notificationDoc.title,
      message: notificationDoc.message,
      notificationType: notificationDoc.notificationType,
      recipient: notificationDoc.recipient ? notificationDoc.recipient.toString() : null,
      recipientType: notificationDoc.recipientType,
      priority: notificationDoc.priority,
      isRead: notificationDoc.isRead,
      createdAt: notificationDoc.createdAt,
      updatedAt: notificationDoc.updatedAt,
    };
  }

  // Fetch notifications by recipient
  async getNotificationsByRecipient(recipientId: string, recipientType: 'User' | 'Company') {
    const notifications = await notificationModel.find({
      recipient: new Types.ObjectId(recipientId),
      recipientType,
    }).exec();

    if (!notifications) {
      throw new Error('No notifications found');
    }

    // Serialize each notification document
    return notifications.map(this.convertNotificationDocToNotification);
  }

  // Mark a notification as read
  async markNotificationAsRead(notificationId: string) {
    const notification = await notificationModel.findByIdAndUpdate(
      new Types.ObjectId(notificationId),
      { isRead: true },
      { new: true }
    ).exec();

    if (!notification) {
      throw new Error('Notification not found');
    }

    // Serialize the updated notification document
    return this.convertNotificationDocToNotification(notification);
  }

  // Fetch system-wide notifications
  async getSystemNotifications() {
    const notifications = await notificationModel.find({
      notificationType: NotificationType.SYSTEM,
      recipient: null,
    }).exec();

    if (!notifications) {
      throw new Error('No system-wide notifications found');
    }

    // Serialize each system-wide notification document
    return notifications.map(this.convertNotificationDocToNotification);
  }

   // Create a new notification
   async createNotification(data: {
    title: string;
    message: string;
    notificationType: NotificationType;
    recipient?: string | null;
    recipientType?: 'User' | 'Company' | null;
    priority: NotificationPriority;
  }) {
    const notificationData: Partial<INotification> = {
      title: data.title,
      message: data.message,
      notificationType: data.notificationType,
      recipient: data.recipient ? new Types.ObjectId(data.recipient) : null,
      recipientType: data.recipientType || null,
      priority: data.priority,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newNotification = new notificationModel(notificationData);
    const savedNotification = await newNotification.save();

    return this.convertNotificationDocToNotification(savedNotification);
  }
}


export const notificationService = new NotificationService();

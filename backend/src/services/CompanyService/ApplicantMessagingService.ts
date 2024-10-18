import JobApplication from '../../database/JobApplication';
import { UserModel } from '../../database/UserModel';
import { NotificationPriority, NotificationType } from '../../database/Notification';
import createHttpError from 'http-errors';
import { notificationService, NotificationService } from '../../services/NotificationService/NotificationService';

export class ApplicantMessagingService {
  
  constructor(private notificationService: NotificationService) {}

  // Send a message to the applicant
  async sendMessageToApplicant(applicantId: string, message: string): Promise<any> {
    const application = await JobApplication.findById(applicantId).populate('user');

    if (!application) {
    //   throw new NotFoundError(`Application with ID ${applicantId} not found`);
        throw createHttpError(401, `Application with ID ${applicantId} not found`);

    }

    const applicant: UserModel = application.user as unknown as UserModel;

    // Use the correct recipient field for notifications
    const notification = await this.notificationService.createNotification({
        title: 'Message from Company',
        message: message,
        notificationType: NotificationType.USER_ALERT, // or any other relevant type
        recipient: applicant._id as any,  // Correctly using recipient instead of 'user'
        recipientType: 'User',
        priority: NotificationPriority.LOW,
      });
  
    return this.convertNotificationDocToNotification(notification);
  }

  // Converts notification document to response format
  convertNotificationDocToNotification(notification: any): any {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      notificationType: notification.notificationType,
      recipient: notification.recipient,
      recipientType: notification.recipientType,
      priority: notification.priority,
      isRead: notification.isRead,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    };
  }
}

export const applicantMessagingService = new ApplicantMessagingService(notificationService);
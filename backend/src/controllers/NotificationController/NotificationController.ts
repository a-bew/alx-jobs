import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
import createHttpError from 'http-errors';
import { messages } from '../../constants';
import { sendError, sendResponse } from '../../helpers';
import { notificationService } from 'services/NotificationService/NotificationService';

// GET: Fetch notifications by recipient (user or company)
export const getNotifications = asyncWrapper(async (req: Request, res: Response) => {
    const { userId, userRole:userType }: any = req;

    try {
      if (!userId) {
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      if (userType !== 'Company' || userType !== 'User') {
        throw createHttpError(403, `${messages.CANNOT_RETRIEVE_USER_DATA} - userType: ${userType}`);
      }
      const notifications = await notificationService.getNotificationsByRecipient(userId, userType);
      return sendResponse(res, notifications, 200);
    } catch (error: any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });
  
  // GET: Fetch system-wide notifications
  export const getSystemNotifications = asyncWrapper(async (req: Request, res: Response) => {
    try {
      const notifications = await notificationService.getSystemNotifications();
      return sendResponse(res, notifications, 200);
    } catch (error: any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });
  
  // POST: Mark a notification as read
  export const markNotificationAsRead = asyncWrapper(async (req: Request, res: Response) => {
    const { notificationId } = req.params;
  
    try {
      const updatedNotification = await notificationService.markNotificationAsRead(notificationId);
      return sendResponse(res, updatedNotification, 200);
    } catch (error: any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });

// POST: Create a new notification
export const createNotification = asyncWrapper(async (req: Request, res: Response) => {
    const { title, message, notificationType, recipient, recipientType, priority } = req.body;
  
    try {
      const newNotification = await notificationService.createNotification({
        title,
        message,
        notificationType,
        recipient,
        recipientType,
        priority,
      });
  
      return sendResponse(res, newNotification, 201);
    } catch (error: any) {
      return sendError(res, createHttpError(500, error.message));
    }
  });
import express from 'express';
import { createNotification, getNotifications, getSystemNotifications, markNotificationAsRead } from '../controllers/NotificationController/NotificationController';

const router = express.Router();

router.post('/notifications', createNotification); // Route for creating a new notification

// Fetch notifications by recipient (user or company)
router.get('/notifications', getNotifications);

// Fetch system-wide notifications
router.get('/notifications/system', getSystemNotifications);

// Mark a notification as read
router.post('/notifications/:notificationId/read', markNotificationAsRead);

export default router;

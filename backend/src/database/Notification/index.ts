import mongoose, { Schema, Document } from 'mongoose';

// Notification Type Enum
export enum NotificationType {
  SYSTEM = 'System',   // General system notifications (e.g., maintenance)
  USER_ALERT = 'UserAlert',   // Alerts specific to a user (e.g., job application updates)
  COMPANY_ALERT = 'CompanyAlert',  // Notifications for companies (e.g., new applicant for job)
}

// Notification Priority Enum
export enum NotificationPriority {
  HIGH = 'High',   // Urgent notifications
  MEDIUM = 'Medium',  // Normal priority notifications
  LOW = 'Low',  // Low priority
}

// Notification Interface (TypeScript)
export interface INotification extends Document {
  title: string;            // Notification title
  message: string;          // Notification message body
  notificationType: NotificationType;   // Type of notification (system, user alert)
  recipient: mongoose.Types.ObjectId | null;   // Target user or company (null if it's a system-wide notification)
  recipientType: 'User' | 'Company' | null;    // Whether it's targeting a User or a Company (null if system-wide)
  priority: NotificationPriority;      // Priority level
  isRead: boolean;           // Whether the notification has been read
  createdAt: Date;
  updatedAt: Date;
}

// Define the Notification schema
const NotificationSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    notificationType: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'recipientType',  // Reference User or Company depending on `recipientType`
      default: null,  // null for system-wide notifications
    },
    recipientType: {
      type: String,
      enum: ['User', 'Company'],
      default: null,  // null if the notification is system-wide
    },
    priority: {
      type: String,
      enum: Object.values(NotificationPriority),
      default: NotificationPriority.MEDIUM,
    },
    isRead: {
      type: Boolean,
      default: false,   // Default to unread
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Compile the model
const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;

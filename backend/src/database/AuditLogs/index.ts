import mongoose, { Schema, Document } from 'mongoose';

interface IAuditLog extends Document {
    action: string;  // Action type, e.g., 'Create Job', 'Delete User', etc.
    admin: mongoose.Types.ObjectId;  // Reference to the admin who performed the action
    targetResource: mongoose.Types.ObjectId;  // Reference to the affected resource (e.g., user or job)
    resourceType: string;  // Type of resource, e.g., 'User', 'Job'
    timestamp: Date;  // When the action was performed
  }
  
  const AuditLogSchema: Schema = new Schema(
    {
      action: {
        type: String,
        required: true,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
      },
      targetResource: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      resourceType: {
        type: String,
        enum: ['User', 'Job'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,  // Automatically add createdAt and updatedAt timestamps
    }
  );
  
  const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
  
  export default AuditLog;
  
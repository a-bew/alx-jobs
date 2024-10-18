import mongoose, { Schema, Document } from 'mongoose';

// Admin Access Levels Enum
export enum AccessLevel {
  SUPER_ADMIN = 'SuperAdmin',   // Full control
  ADMIN = 'Admin',              // Limited control
  MODERATOR = 'Moderator',      // Moderate control
}

// Admin Interface (TypeScript)
interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: AccessLevel;  // Access level of the admin
  isActive: boolean;  // Whether the admin account is active or not
  lastLogin: Date;    // Track the last login timestamp
  createdAt: Date;
  updatedAt: Date;
}

// Define the Admin schema
const AdminSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,  // Enforcing minimum password length
    },
    role: {
      type: String,
      enum: Object.values(AccessLevel),  // Can be SuperAdmin, Admin, or Moderator
      default: AccessLevel.ADMIN,  // Default access level
    },
    isActive: {
      type: Boolean,
      default: true,  // Admin account is active by default
    },
    lastLogin: {
      type: Date,  // Store last login time for security purposes
    },
  },
  {
    timestamps: true,  // Automatically create `createdAt` and `updatedAt`
  }
);

// Compile the model
const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;

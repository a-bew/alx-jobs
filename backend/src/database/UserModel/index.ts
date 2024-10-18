import mongoose, { Document } from "mongoose";

import { USER_ROLES, UserRoles } from "../../types";

import userTokenModel from "./userTokenModel";

const { Schema } = mongoose;

// export interface UserModel extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: UserRoles;
//   photo?: string;
//   aboutMe?: string;
  
// }

// const UserSchema = new Schema<UserModel>({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     select: false,
//     minLength: 5,
//   },
//   role: {
//     type: String,
//     required: true,
//     enum: USER_ROLES,
//   },
//   photo: {
//     type: String,
//   },
//   aboutMe: {
//     type: String,
//   },
// });

// export default mongoose.model<UserModel>("Users", UserSchema);

export interface UserModel extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  isActive: boolean;
  role: UserRoles;
  onboardingCompleted: boolean;
  preferences: mongoose.Types.ObjectId;  // Reference to the User applying for the job
  profile: mongoose.Types.ObjectId;   // Reference to the Job
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string; // For email verification
  verificationExpires?: Date; // For token expiration
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema (MongoDB)
const UserSchema = new Schema<UserModel>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: USER_ROLES,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    preferences: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPreferences",
      required: false,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: false,
    },
    resetPasswordToken: {
      type: String, // Token for password reset
    },
    resetPasswordExpires: {
      type: Date, // Expiration time for the reset token
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ resetPasswordToken: 1 });

/* istanbul ignore next */
UserSchema.pre("findOneAndDelete", { document: true, query: true }, function middleware(next) {
  const id = this.getQuery()._id;
  userTokenModel.deleteMany({ userId: id }).exec();
  next();
});

// Compile the model
const User = mongoose.model<UserModel>('Users', UserSchema);

export default User;

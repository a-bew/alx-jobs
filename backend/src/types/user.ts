export const USER_ROLES = ["admin", "user", "company"] as const;
export const JOB_OWNER_ROLES = ["admin", "company"] as const;

export type UserRoles = (typeof USER_ROLES)[number];

export type JobOwnerRoles = (typeof JOB_OWNER_ROLES)[number];

export enum UserAccessLevel {
  ADMIN = 'admin',   // Full control
  USER = 'user',              // Limited control
  COMPANY = 'company',      // Moderate control
}

export const JOB_STATUS = ['pending', 'accepted', 'rejected', 'withdrawn'] as const;

export type JobStatusRoles = (typeof JOB_STATUS)[number];

export interface User {
  id: string;
  role: UserRoles;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  preferences?: {
    jobType?: string;
    industry?: string;
    location?: string;
  };
  profile?: {
    bio?: string;
    qualifications?: string[];
    experience?: string[];
  };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  verificationToken?: string; // For email verification
  verificationExpires?: Date; // For token expiration
  createdAt?: Date;
}
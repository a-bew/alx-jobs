import mongoose, { Schema, Document } from 'mongoose';

// Admin Access Levels Enum
export enum AccessLevel {
  SUPER_ADMIN = 'SuperAdmin',   // Full control
  ADMIN = 'Admin',              // Limited control
  MODERATOR = 'Moderator',      // Moderate control
}

// Define the interface for the Company document (TypeScript)
interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  role: AccessLevel;  // Access level of the admin
  industry: string;
  location: string;
  description?: string;
  website?: string;
  jobsPosted: mongoose.Types.ObjectId[];  // Reference to jobs posted by the company
  applicants: mongoose.Types.ObjectId[];  // Reference to job applications for the company's jobs
  createdAt: Date;
  updatedAt: Date;
}

// Define the Company schema (MongoDB)
const CompanySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,  // e.g., New York, Remote, etc.
      required: true,
    },
    description: {
      type: String,  // A short bio or overview of the company
    },
    website: {
      type: String,  // Company website URL
    },
    jobsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',  // Reference to Job postings
      },
    ],
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',  // Reference to applications
      },
    ],
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
    timestamps: true,  // Automatically add 'createdAt' and 'updatedAt'
  }
);

// Compile the model
const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;

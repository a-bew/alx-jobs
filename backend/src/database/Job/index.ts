import mongoose, { Schema, Document } from 'mongoose';
import { JOB_OWNER_ROLES, JobOwnerRoles } from "../../types";

// Define the interface for the Job document (TypeScript)
export interface IJob extends Document {
  title: string;
  description: string;
  requirements: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  jobOwner: JobOwnerRoles;
  location: string;
  jobType: string;  // e.g., full-time, part-time, remote, etc.
  company: mongoose.Types.ObjectId;  // Reference to the Company
  listingStatus: string;  // e.g., 'approved', 'rejected', 'active', 'closed', 'paused'
  applicants: mongoose.Types.ObjectId[];  // Reference to Applications
  isRemote: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// Define the Job schema (MongoDB)
const JobSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,  // Specific job requirements, skills, etc.
      },
    ],
    salaryRange: {
      min: {
        type: Number,  // Minimum salary for the job
      },
      max: {
        type: Number,  // Maximum salary for the job
      },
    },
    location: {
      type: String,  // Location of the job or 'Remote'
      required: true,
    },
    jobType: {
      type: String,  // e.g., 'full-time', 'part-time', 'contract', 'freelance', 'remote'
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',  // Reference to the Company that posted the job
      required: true,
    },
    jobOwner: {
      type: JOB_OWNER_ROLES,
      default: 'admin'
    },
    listingStatus: {
      type: String,
      enum: ['active', 'closed', 'paused'],  // Status of the job listing
      default: 'active',
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',  // Reference to job applications for this job
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

JobSchema.index({ location: 1 });
JobSchema.index({ jobType: 1 });
JobSchema.index({ listingStatus: 1 });
JobSchema.index({ company: 1 });

// Compile the model
const Job = mongoose.model<IJob>('Job', JobSchema);

export default Job;

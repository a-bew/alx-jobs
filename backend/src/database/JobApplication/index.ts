import mongoose, { Schema, Document } from 'mongoose';
import { JOB_STATUS } from '../../types';

// Define the interface for the Application document (TypeScript)
export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;  // Reference to the User applying for the job
  job: mongoose.Types.ObjectId;   // Reference to the Job
  company: mongoose.Types.ObjectId;  // Reference to the Company
  resumeUrl?: string;  // URL to the resume document
  coverLetter?: string;  // Optional cover letter text
  status: string;  // Application status (e.g., 'pending', 'accepted', 'rejected', 'withdrawn')
  submittedAt: Date;  // When the application was submitted
  updatedAt: Date;  // Last status update
}

// Define the Job Application schema (MongoDB)
const ApplicationSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',  // Reference to the Job model
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',  // Reference to the Company model
      required: true,
    },
    resumeUrl: {
      type: String,  // Link to the resume or CV uploaded by the user
    },
    coverLetter: {
      type: String,  // Cover letter text (optional)
    },
    status: {
      type: String,
      enum: JOB_STATUS,//['pending', 'accepted', 'rejected', 'withdrawn'],  // Various statuses of the application
      default: 'pending',
    },
    submittedAt: {
      type: Date,
      default: Date.now,  // Automatically set to the current time when the application is submitted
    },
    updatedAt: {
      type: Date,
      default: Date.now,  // Automatically updated when the application status changes
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

// Compile the model
const JobApplication = mongoose.model<IApplication>('Application', ApplicationSchema);

export default JobApplication;

import mongoose, { Schema, Document } from 'mongoose';

// Interface for the User Preferences schema (TypeScript)
export interface IUserPreferences extends Document {
  user: mongoose.Types.ObjectId;  // Reference to the User
  industries: string[];  // Array of industries the user is interested in
  locations: string[];  // Array of preferred job locations (city, country, or remote)
  jobTypes: string[];  // Array of job types (e.g., full-time, part-time, contract, freelance)
  salaryRange?: {
    min: number;  // Minimum salary the user expects
    max: number;  // Maximum salary the user expects
  };
  experienceLevel?: string;  // The user's preferred experience level for jobs (e.g., entry-level, mid, senior)
  remotePreference: boolean;  // Whether the user prefers remote jobs
  keywords?: string[];  // Optional keywords that match specific roles or skills
  notifyByEmail: boolean; 
  createdAt: Date;
  updatedAt: Date;
}

// Define the User Preferences schema
const UserPreferencesSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true,
      unique: true,  // Each user has one preferences document
    },
    industries: {
      type: [String],  // Array of industries, e.g., "Tech", "Healthcare", "Finance"
      default: [],
    },
    locations: {
      type: [String],  // Array of preferred locations, e.g., ["New York", "London", "Remote"]
      default: [],
    },
    jobTypes: {
      type: [String],  // Array of job types, e.g., ["Full-time", "Part-time", "Contract"]
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Temporary', 'Internship'],
      default: ['Full-time'],  // Default to full-time
    },
    salaryRange: {
      min: { type: Number, default: 0 },  // Minimum salary (optional)
      max: { type: Number },  // Maximum salary (optional)
    },
    experienceLevel: {
      type: String,  // Preferred experience level
      enum: ['Entry-level', 'Mid', 'Senior', 'Director'],
      default: 'Entry-level',
    },
    remotePreference: {
      type: Boolean,  // Whether the user prefers remote jobs
      default: false,
    },
    keywords: {
      type: [String],  // Array of keywords for job filtering, e.g., ["JavaScript", "React", "Management"]
      default: [],
    },
    notifyByEmail: { type: Boolean, default: true },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
  }
);

// Compile the model
const UserPreferences = mongoose.model<IUserPreferences>('UserPreferences', UserPreferencesSchema);

export default UserPreferences;

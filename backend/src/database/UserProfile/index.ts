import mongoose, { Schema, Document } from 'mongoose';

// Interface for the User Profile schema (TypeScript)
interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;  // Reference to the User
  bio?: string;  // The user's bio or description
  qualifications?: string[];  // Array of the user's qualifications
  experience?: string[];  // Array of the user's work experience
  createdAt: Date;
  updatedAt: Date;
}

// Define the User Profile schema
const UserProfileSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      required: true,
      unique: true,  // Each user has one profile document
    },
    bio: {
      type: String,  // The user's bio
      default: '',
    },
    qualifications: {
      type: [String],  // Array of qualifications
      default: [],
    },
    experience: {
      type: [String],  // Array of work experience
      default: [],
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
  }
);

// Compile the model
const UserProfile = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);

export default UserProfile;

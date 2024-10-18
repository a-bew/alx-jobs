// import UserPreferences from "../../database/UserPreferencesModel"; // New UserPreference model
import UserPreferences from '../../database/UserPreferences';
import { Types } from 'mongoose';

class UserPreferenceService {
  // Fetch user preferences based on userId
  async getUserPreferences(userId: string) {
    const preferences = await UserPreferences.findOne({ user: new Types.ObjectId(userId) });

    if (!preferences) {
      throw new Error('User preferences not found');
    }

    return this.convertUserDocToUserPreferences(preferences);
  }

  // Update or set user preferences
  async setUserPreferences(
    userId: string,
    preferencesData: {
      industries?: string[];
      locations?: string[];
      jobTypes?: string[];
      salaryRange?: {
        min: number;
        max: number;
      };
      experienceLevel?: string;
      remotePreference?: boolean;
      keywords?: string[];
    }
  ) {
    const updateData: { [key: string]: any } = {};

    if (preferencesData.industries) updateData.industries = preferencesData.industries;
    if (preferencesData.locations) updateData.locations = preferencesData.locations;
    if (preferencesData.jobTypes) updateData.jobTypes = preferencesData.jobTypes;
    if (preferencesData.salaryRange) updateData.salaryRange = preferencesData.salaryRange;
    if (preferencesData.experienceLevel) updateData.experienceLevel = preferencesData.experienceLevel;
    if (preferencesData.remotePreference !== undefined) updateData.remotePreference = preferencesData.remotePreference;
    if (preferencesData.keywords) updateData.keywords = preferencesData.keywords;

    const preferences = await UserPreferences.findOneAndUpdate(
      { user: new Types.ObjectId(userId) },
      { $set: updateData },
      { new: true, upsert: true }  // Create if not exists, return new document
    );

    return this.convertUserDocToUserPreferences(preferences);
  }

  private convertUserDocToUserPreferences(userPreferencesDoc: any) {
    return {
      industries: userPreferencesDoc.industries || [],
      locations: userPreferencesDoc.locations || [],
      jobTypes: userPreferencesDoc.jobTypes || ['Full-time'],
      salaryRange: {
        min: userPreferencesDoc.salaryRange?.min || 0,
        max: userPreferencesDoc.salaryRange?.max || null,
      },
      experienceLevel: userPreferencesDoc.experienceLevel || 'Entry-level',
      remotePreference: userPreferencesDoc.remotePreference || false,
      keywords: userPreferencesDoc.keywords || [],
      createdAt: userPreferencesDoc.createdAt,
      updatedAt: userPreferencesDoc.updatedAt,
    };
  }
  
}

export const userPreferenceService = new UserPreferenceService();

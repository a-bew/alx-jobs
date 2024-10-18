import { Types } from 'mongoose';
import userProfileModel from '../../database/UserProfile';
import userModel from "../../database/UserModel";


class UserProfileService {
  // Fetch user profile
  async getUserProfile(userId: string) {
    const profile = await userProfileModel.findOne({ user: new Types.ObjectId(userId) })
      .populate('user', 'firstName lastName email') // Populating firstName, lastName, and email from User
      .exec();

    if (!profile) {
      throw new Error('User profile not found');
    }

    return this.convertUserProfileDoc(profile);
  }

  // Update user profile (updates both user and profile models)
  async updateUserProfile(
    userId: string,
    profileData: {
      firstName?: string;
      lastName?: string;
      bio?: string;
      qualifications?: string[];
      experience?: string[];
    }
  ) {
    const session = await userModel.startSession();
    session.startTransaction(); // Begin transaction to update both user and profile

    try {
      const user = await userModel.findById(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Update firstName and lastName in User model if provided
      if (profileData.firstName) user.firstName = profileData.firstName;
      if (profileData.lastName) user.lastName = profileData.lastName;
      await user.save({ session }); // Save user model changes within the transaction

      // Update bio, qualifications, and experience in UserProfile model
      const updateData: any = {};
      if (profileData.bio) updateData.bio = profileData.bio;
      if (profileData.qualifications) updateData.qualifications = profileData.qualifications;
      if (profileData.experience) updateData.experience = profileData.experience;

      const updatedProfile = await userProfileModel.findOneAndUpdate(
        { user: new Types.ObjectId(userId) },
        updateData,
        { new: true, session }
      )
      .populate('user', 'firstName lastName email')  // Re-populate after update
      .exec();

      await session.commitTransaction(); // Commit the transaction
      session.endSession();

      return this.convertUserProfileDoc(updatedProfile);

    } catch (error) {
      await session.abortTransaction(); // Rollback on error
      session.endSession();
      throw error;
    }
  }

  private convertUserProfileDoc(profileDoc: any) {
    return {
      firstName: profileDoc.user.firstName,
      lastName: profileDoc.user.lastName,
      email: profileDoc.user.email,
      bio: profileDoc.bio || '',
      qualifications: profileDoc.qualifications || [],
      experience: profileDoc.experience || [],
    };
  }
}

export const userProfileService = new UserProfileService();

import userTokenModel from '../../database/UserModel/userTokenModel';
import { Types } from 'mongoose';
import userModel from '../../database/UserModel'; // Assuming UserModel is defined
// import { IUser } from '../models/UserModel'; // Assuming IUser is the user interface

class AdminUserService {
  // Private method to convert user document to serialized user data
  private convertUserDocToUser(userDoc: any) {
    return {
      id: userDoc._id.toString(),
      username: userDoc.username,
      email: userDoc.email,
      isActive: userDoc.isActive,
      role: userDoc.role,
      lastLogin: userDoc.lastLogin,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };
  }

  // Admin can deactivate a user account
  async deactivateUser(userId: string) {
    const updatedUser = await userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.convertUserDocToUser(updatedUser);
  }

  // Admin can reactivate a deactivated user account
  async reactivateUser(userId: string) {
    const updatedUser = await userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      { isActive: true, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.convertUserDocToUser(updatedUser);
  }
}

export const adminUserService = new AdminUserService();

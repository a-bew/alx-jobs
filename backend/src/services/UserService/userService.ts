import { Document, Types } from "mongoose";

// import userModel, { UserModel } from "../database/model/userModel";
import { User, UserRoles } from "../../types";
import userModel, { UserModel } from "../../database/UserModel";

type UserDoc = Document<unknown, NonNullable<unknown>, UserModel> &
  Omit<
    UserModel & {
      _id: Types.ObjectId;
    },
    never
  >;

const convertUserDocToUser = (userDoc: UserDoc|any) => {
  const user: User = {
    id: userDoc._id.toString(),
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    email: userDoc.email,
    password: userDoc.password,
    emailVerified: userDoc.emailVerified,
    onboardingCompleted: false,
    role: userDoc.role,
    createdAt: userDoc.createdAt,
    resetPasswordToken: userDoc.resetPasswordToken,
    verificationToken: userDoc.verificationToken,// For email verification
    verificationExpires: userDoc.verificationExpires, // For token expiration
    resetPasswordExpires: userDoc.resetPasswordExpires
    // photo: userDoc.photo,  
    // aboutMe: userDoc.aboutMe,
  };

  return user;
};

export const userService = {
  create: async (
    firstName: string,
    lastName: string,
    email: string,
    hashPassword: string,
    role: UserRoles,
  ): Promise<User> => {
    const userDoc = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });
    return convertUserDocToUser(userDoc);
  },

  findUserByEmail: async (email: string) => {
    const userDoc = await userModel.findOne({ email }).select("+password").exec();

    if (!userDoc) {
      return null;
    }

    return convertUserDocToUser(userDoc);
  },

  findAllUsers: async () => {
    const userDoc = await userModel.find().exec();

    return userDoc.map(doc => convertUserDocToUser(doc));
  },

  findUserById: async (id: string) => {
    const userDoc = await userModel.findOne({ _id: new Types.ObjectId(id) }).exec();

    if (!userDoc) {
      return null;
    }

    return convertUserDocToUser(userDoc);
  },


 findAndUpdateUserById : async ({ 
    id, 
    email, 
    password, 
    emailVerified, 
    role, 
    onboardingCompleted, 
    preferences, 
    profile, 
    resetPasswordToken, 
    resetPasswordExpires,
    verificationToken, // For email verification
    verificationExpires // For token expiration
    }: { 
    id: string, 
    email?: string, 
    password?: string, 
    emailVerified?: boolean, 
    role?: UserRoles, 
    onboardingCompleted?: boolean, 
    preferences?: {
      jobType?: string;
      industry?: string;
      location?: string;
    }, 
    profile?: {
      bio?: string;
      qualifications?: string[];
      experience?: string[];
    }, 
    resetPasswordToken?: string, 
    resetPasswordExpires?: Date,
    verificationToken?: string; // For email verification
    verificationExpires?: Date; // For token expiration 
  }) => {
    const updateData: { 
      [key: string]: any 
    } = {};
  
    // Simple fields
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (typeof emailVerified !== 'undefined') updateData.emailVerified = emailVerified;
    if (role) updateData.role = role;
    if (typeof onboardingCompleted !== 'undefined') updateData.onboardingCompleted = onboardingCompleted;
    
    // Nested fields: preferences
    if (preferences) {
      if (preferences.jobType) updateData['preferences.jobType'] = preferences.jobType;
      if (preferences.industry) updateData['preferences.industry'] = preferences.industry;
      if (preferences.location) updateData['preferences.location'] = preferences.location;
    }
  
    // Nested fields: profile
    if (profile) {
      if (profile.bio) updateData['profile.bio'] = profile.bio;
      if (profile.qualifications) updateData['profile.qualifications'] = profile.qualifications;
      if (profile.experience) updateData['profile.experience'] = profile.experience;
    }
  
    // Reset password token and expiry fields
    if (resetPasswordToken) updateData.resetPasswordToken = resetPasswordToken;
    if (resetPasswordExpires) updateData.resetPasswordExpires = resetPasswordExpires;
    if (verificationToken) updateData.verificationToken = verificationToken; // For email verification
    if (verificationExpires) updateData.verificationExpires = verificationExpires; // For token expiration  



    // Ensure that there's something to update
    if (Object.keys(updateData).length > 0) {

      const row = await userModel
        .findOneAndUpdate(
          { _id: new Types.ObjectId(id) }, 
          { $set: updateData }, // Use $set to update only specified fields
          { returnDocument: "after" }
        )
        .exec();

      if (row) {
        return convertUserDocToUser(row); // Convert the updated user document
      }
    }
  
    return null;
  },

  deleteUserById: async (id: string) => {
    const userDoc = await userModel.findOneAndDelete({ _id: new Types.ObjectId(id) });

    if (!userDoc) {
      return null;
    }

    return convertUserDocToUser(userDoc);
  },
};
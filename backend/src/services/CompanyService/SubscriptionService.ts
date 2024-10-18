// services/CompanyService/SubscriptionService.ts
import SubscriptionModel from '../../database/SubscriptionModel';
import { Types } from 'mongoose';

export const subscriptionService = {
  createSubscription: async (companyId: string, type: string) => {
    const subscription = new SubscriptionModel({
      companyId: new Types.ObjectId(companyId),
      type,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    await subscription.save();
    return subscription;
  },

  getCompanySubscription: async (companyId: string) => {
    return await SubscriptionModel.findOne({ companyId }).exec();
  },

  updateSubscription: async (companyId: string, type: string) => {
    return await SubscriptionModel.findOneAndUpdate(
      { companyId },
      { type },
      { new: true }
    ).exec();
  },

  cancelSubscription: async (companyId: string) => {
    return await SubscriptionModel.findOneAndUpdate(
      { companyId },
      { isActive: false },
      { new: true }
    ).exec();
  },
};

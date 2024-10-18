// models/SubscriptionModel.ts
import { Schema, model, Document, Types } from 'mongoose';

interface ISubscription extends Document {
  companyId: Types.ObjectId | null;  // The company that owns the subscription
  type: string;               // Subscription type (e.g., 'basic', 'premium')
  startDate: Date;           // Start date of the subscription
  endDate: Date;             // End date of the subscription
  isActive: boolean;         // Whether the subscription is currently active
}

const subscriptionSchema = new Schema<ISubscription>({
  companyId: { type: Types.ObjectId , required: true, ref: 'Company' },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

const SubscriptionModel = model<ISubscription>('Subscription', subscriptionSchema);

export default SubscriptionModel;

// controllers/CompanyController/SubscriptionController.ts
import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import { subscriptionService } from '../../services/CompanyService/SubscriptionService';
import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { sendResponse, sendError } from '../../helpers';

// Controller to create a new subscription
export const createSubscription = asyncWrapper(async (req: Request, res: Response) => {
  const { companyId, type } = req.body;

  try {
    const newSubscription = await subscriptionService.createSubscription(companyId, type);
    return sendResponse(res, newSubscription, 201);
  } catch (error) {
    return sendError(res, createHttpError(500, "Failed to create subscription"));
  }
});

// Controller to get a company's current subscription
export const getCompanySubscription = asyncWrapper(async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const subscription = await subscriptionService.getCompanySubscription(companyId);
    if (!subscription) {
      return sendError(res, createHttpError(404, "Subscription not found"));
    }
    return sendResponse(res, subscription, 200);
  } catch (error) {
    return sendError(res, createHttpError(500, "Failed to fetch subscription"));
  }
});

// Controller to update a company's subscription
export const updateSubscription = asyncWrapper(async (req: Request, res: Response) => {
  const { companyId, type } = req.body;

  try {
    const updatedSubscription = await subscriptionService.updateSubscription(companyId, type);
    if (!updatedSubscription) {
      return sendError(res, createHttpError(404, "Subscription not found"));
    }
    return sendResponse(res, updatedSubscription, 200);
  } catch (error) {
    return sendError(res, createHttpError(500, "Failed to update subscription"));
  }
});

// Controller to cancel a company's subscription
export const cancelSubscription = asyncWrapper(async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const canceledSubscription = await subscriptionService.cancelSubscription(companyId);
    if (!canceledSubscription) {
      return sendError(res, createHttpError(404, "Subscription not found"));
    }
    return sendResponse(res, canceledSubscription, 200);
  } catch (error) {
    return sendError(res, createHttpError(500, "Failed to cancel subscription"));
  }
});

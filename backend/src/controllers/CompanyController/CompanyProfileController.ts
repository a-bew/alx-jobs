import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from '../../helpers';
import createHttpError from 'http-errors';
import { companyService } from '../../services/CompanyService/CompanyService';

// GET: View Company Profile
export const viewCompanyProfile = asyncWrapper(async (req: Request, res: Response) => {
  const { userId: companyId } = req; // Assuming req.user contains authenticated company details
  if (!companyId) {
    return sendError(res, createHttpError(401, 'Unauthorized access.'));
  }

  try {
    const companyProfile = await companyService.getCompanyProfile(companyId);
    return sendResponse(res, companyProfile, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
  
});

// PUT: Update Company Profile
export const updateCompanyProfile = asyncWrapper(async (req: Request, res: Response) => {
  const { userId: companyId } = req; // Assuming req.user contains authenticated company details
  const { name, industry, location, description, website } = req.body;

  if (!companyId) {
    return sendError(res, createHttpError(401, 'Unauthorized access.'));
  }

  if (!name && !industry && !location && !description && !website) {
    return sendError(res, createHttpError(400, 'At least one field is required to update.'));
  }

  try {
    
    const updatedProfile = await companyService.updateCompanyProfile(companyId, { 
      name, 
      industry, 
      location, 
      description, 
      website 
    });

    return sendResponse(res, updatedProfile, 200);

  } catch (error: any) {

    return sendError(res, createHttpError(500, error.message));

  }
});

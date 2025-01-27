// import { asyncWrapper } from 'controllers/utils/asyncWrapper';
import { asyncWrapper } from '../../controllers/utils/asyncWrapper';
import { Request, Response } from 'express';
import { sendError, sendResponse } from '../../helpers';
import createHttpError from 'http-errors';
import { companyAuthService } from '../../services/CompanyService/CompanyAuthService';

// POST: Company Signup
export const companySignup = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, password, adminContact } = req.body;

  if (!name || !email || !password || !adminContact) {
    return sendError(res, createHttpError(400, 'All fields are required.'));
  }

  try {
    const newCompany = await companyAuthService.signup({ name, email, password, adminContact });
    return sendResponse(res, newCompany, 201);
  } catch (error: any) {
    return sendError(res, createHttpError(500, error.message));
  }
});

// POST: Company Login
export const companyLogin = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendError(res, createHttpError(400, 'Email and password are required.'));
  }

  try {
    const { company, token } = await companyAuthService.login(email, password);
    return sendResponse(res, { company, token }, 200);
  } catch (error: any) {
    return sendError(res, createHttpError(401, error.message));
  }
});

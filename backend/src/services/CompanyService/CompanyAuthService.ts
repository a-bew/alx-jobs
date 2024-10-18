import companyModel from '../../database/Company'; // Assuming CompanyModel is defined
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { config } from '../../config';

class CompanyAuthService {
  // Company signup
  async signup(companyData: { name: string; email: string; password: string; adminContact: string }) {
    // Check if the company already exists
    const existingCompany = await companyModel.findOne({ email: companyData.email });
    if (existingCompany) {
      throw createHttpError(400, 'Company already registered with this email.');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(companyData.password, 10);

    // Create a new company record
    const newCompany = await companyModel.create({
      name: companyData.name,
      email: companyData.email,
      password: hashedPassword,
      adminContact: companyData.adminContact,
    });

    // Return the new company in a serialized form
    return this.convertCompanyDocToCompany(newCompany);
  }

  // Company login
  async login(email: string, password: string) {
    // Find company by email
    const company = await companyModel.findOne({ email });
    if (!company) {
      throw createHttpError(401, 'Invalid credentials.');
    }

    // Compare password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      throw createHttpError(401, 'Invalid credentials.');
    }

    // Generate JWT token for company
    const token = jwt.sign({ id: company._id }, config.companyAccessTokenPrivateKey, { expiresIn: '1d' });

    // Return company details and token
    return {
      company: this.convertCompanyDocToCompany(company),
      token,
    };
  }

  // Convert company document to a serialized form
  private convertCompanyDocToCompany(companyDoc: any) {
    return {
      id: companyDoc._id.toString(),
      name: companyDoc.name,
      email: companyDoc.email,
      adminContact: companyDoc.adminContact,
      createdAt: companyDoc.createdAt,
      updatedAt: companyDoc.updatedAt,
    };
  }
}

export const companyAuthService = new CompanyAuthService();
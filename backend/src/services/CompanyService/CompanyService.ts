import companyModel from '../../database/Company'; // Assuming CompanyModel is defined
import createHttpError from 'http-errors';

class CompanyService {

    // Retrieve company profile by ID
    async getCompanyProfile(companyId: string) {
      const company = await companyModel.findById(companyId).populate('jobsPosted applicants'); // Populate jobs and applicants if needed
      if (!company) {
        throw createHttpError(404, 'Company not found.');
      }
  
      // Return the company in a serialized form
      return this.convertCompanyDocToCompany(company);
    }
  
    // Update company profile
    async updateCompanyProfile(companyId: string, updateData: { 
      name?: string; 
      industry?: string; 
      location?: string; 
      description?: string; 
      website?: string; 
    }) {
      const company = await companyModel.findById(companyId);
      if (!company) {
        throw createHttpError(404, 'Company not found.');
      }
  
      // Update allowed fields
      if (updateData.name) company.name = updateData.name;
      if (updateData.industry) company.industry = updateData.industry;
      if (updateData.location) company.location = updateData.location;
      if (updateData.description) company.description = updateData.description;
      if (updateData.website) company.website = updateData.website;
  
      // Save the updated company document
      const updatedCompany = await company.save();
  
      // Return the updated company in a serialized form
      return this.convertCompanyDocToCompany(updatedCompany);
    }
  
    // Convert company document to a serialized form
    private convertCompanyDocToCompany(companyDoc: any) {
      return {
        id: companyDoc._id.toString(),
        jobOwner: 'company',
        name: companyDoc.name,
        industry: companyDoc.industry,
        location: companyDoc.location,
        description: companyDoc.description,
        website: companyDoc.website,
        jobsPosted: companyDoc.jobsPosted, // Array of job references
        applicants: companyDoc.applicants,  // Array of applicant references
        createdAt: companyDoc.createdAt,
        updatedAt: companyDoc.updatedAt,
      };
    }
  }
  
  export const companyService = new CompanyService();
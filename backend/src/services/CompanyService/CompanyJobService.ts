import { Types } from 'mongoose';
import jobModel from '../../database/Job'; // Assuming JobModel is defined
import createHttpError from 'http-errors';
import companyModel from '../../database/Company';

class JobService {

  // Post a new job listing
  async postNewJob(companyId: string, jobData: {
    title: string;
    description: string;
    requirements: string[];
    salaryRange?: { min: number; max: number };
    location: string;
    jobType: string;
    isRemote: boolean;
  }) {
    const company = await companyModel.findById(companyId);
    if (!company) {
      throw createHttpError(404, 'Company not found.');
    }
    const newJob:any = new jobModel({
      ...jobData,
      company: company._id,
      listingStatus: 'active', // Default status is 'active'
      applicants: [],  // No applicants initially
    });

    await newJob.save();

    // Add this job to the company's `jobsPosted`
    company.jobsPosted.push(newJob._id);
    await company.save();

    return this.convertJobDocToJob(newJob);
  }

  // Update existing job listing
  async updateJob(companyId: string, jobId: string, updateData: {
    title?: string;
    description?: string;
    requirements?: string[];
    salaryRange?: { min: number; max: number };
    location?: string;
    jobType?: string;
    isRemote?: boolean;
    listingStatus?: string; // Allow status update
  }) {
    const job = await jobModel.findOne({ _id: jobId, company: companyId });
    if (!job) {
      throw createHttpError(404, 'Job not found or not owned by the company.');
    }

    // Update the job with the provided data
    if (updateData.title) job.title = updateData.title;
    if (updateData.description) job.description = updateData.description;
    if (updateData.requirements) job.requirements = updateData.requirements;
    if (updateData.salaryRange) job.salaryRange = updateData.salaryRange;
    if (updateData.location) job.location = updateData.location;
    if (updateData.jobType) job.jobType = updateData.jobType;
    if (updateData.isRemote !== undefined) job.isRemote = updateData.isRemote;
    if (updateData.listingStatus) job.listingStatus = updateData.listingStatus;

    const updatedJob = await job.save();
    return this.convertJobDocToJob(updatedJob);
  }

  // Delete an existing job listing

  
  async deleteJob(companyId: string, jobId: string) {
    const job:any = await jobModel.findOne({ _id: jobId, company: companyId });
    if (!job) {
      throw createHttpError(404, 'Job not found or not owned by the company.');
    }

    await job?.remove();

    // Remove the job from the company's `jobsPosted`
    await companyModel.updateOne({ _id: companyId }, { $pull: { jobsPosted: jobId } });

    return { message: 'Job deleted successfully.' };
  }

  // Convert job document to a serialized form
  private convertJobDocToJob(jobDoc: any) {
    return {
      id: jobDoc._id.toString(),
      title: jobDoc.title,
      description: jobDoc.description,
      requirements: jobDoc.requirements,
      salaryRange: jobDoc.salaryRange,
      location: jobDoc.location,
      jobType: jobDoc.jobType,
      company: jobDoc.company.toString(),
      listingStatus: jobDoc.listingStatus,
      applicants: jobDoc.applicants,  // Array of applicant references
      isRemote: jobDoc.isRemote,
      createdAt: jobDoc.createdAt,
      updatedAt: jobDoc.updatedAt,
    };
  }
}

export const jobService = new JobService();

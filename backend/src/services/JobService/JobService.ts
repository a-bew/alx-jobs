import { Types } from 'mongoose';
import userModel, { UserModel } from "../../database/UserModel";
import jobModel from "../../database/Job";
import { IUserPreferences } from '../../database/UserPreferences';

class JobService {
    // Fetch curated jobs for the user based on their preferences

    async getForYouJobs(userId: string) {
        const user = await userModel
          .findById(userId)
          .populate<{ preferences: IUserPreferences }>('preferences')
          .exec();
      
        if (!user) {
          return null;
        }
      
        const { jobTypes, industries, locations, salaryRange, remotePreference } = user.preferences;
      
        // Create a filter object to handle optional preferences
        const filter: any = {
          listingStatus: 'active',
        };
      
        if (industries?.length > 0) {
          filter.industry = { $in: industries };
        }
      
        if (locations?.length > 0) {
          filter.location = { $in: locations };
        }
      
        if (jobTypes?.length > 0) {
          filter.jobType = { $in: jobTypes };
        }
      
        if (salaryRange) {
          filter.salary = { $gte: salaryRange.min, $lte: salaryRange.max };
        }
      
        if (typeof remotePreference !== 'undefined') {
          filter.isRemote = remotePreference;
        }
      
        const jobs = await jobModel.find(filter);
      
        return jobs.map(this.convertJobDocToJob);

      }

    // Fetch all active job listings
    async getAllJobs() {
      const jobs = await jobModel.find({ listingStatus: 'active' });
      return jobs.map(this.convertJobDocToJob);
    }
  
    // Search for jobs based on keywords
    async searchJobs(query: string) {
      const jobs = await jobModel.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
          { requirements: { $in: [new RegExp(query, 'i')] } },
        ],
        listingStatus: 'active',
      });
  
      return jobs.map(this.convertJobDocToJob);
    }
  
    // Fetch detailed information about a specific job listing
  async getJobDetails(jobId: string) {
    
    const job = await jobModel.findById(new Types.ObjectId(jobId));

    if (!job) {
      return null;
    //   throw new Error('Job not found');
    }

    return this.convertJobDocToJob(job);

  }

    // Helper function to convert job document to response format
    private convertJobDocToJob(jobDoc: any) {
      return {
        id: jobDoc._id.toString(),
        title: jobDoc.title,
        description: jobDoc.description,
        requirements: jobDoc.requirements,
        salaryRange: jobDoc.salaryRange,
        location: jobDoc.location,
        jobType: jobDoc.jobType,
        listingStatus: jobDoc.listingStatus,
        company: jobDoc.company,
        applicants: jobDoc.applicants,
        createdAt: jobDoc.createdAt,
        updatedAt: jobDoc.updatedAt,
      };
    }



    
  }
  
  export const jobService = new JobService();
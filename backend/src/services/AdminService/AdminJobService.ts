// services/NotificationService.ts
// import { NotificationModel } from '../models/Notification';
// import { UserModel } from '../models/User';

import { Types } from 'mongoose';
import jobModel from '../../database/Job'; // Assuming JobModel is defined
import { IJob } from '../../database/Job'; // Assuming IJob is the job interface

class AdminJobService {
  // Private method to convert job document to serialized job data
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
      isRemote: jobDoc.isRemote,
      company: jobDoc.company ? jobDoc.company.toString() : null,
      applicants: jobDoc.applicants.map((applicant: any) => applicant.toString()),  // Convert applicants to string
      createdAt: jobDoc.createdAt,
      updatedAt: jobDoc.updatedAt,
    };
  }

  // Admin can post a new job listing
  async postNewJob(jobData: Partial<IJob>) {
    const newJob = new jobModel({
      ...jobData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const savedJob = await newJob.save();
    return this.convertJobDocToJob(savedJob);
  }

  // Admin can update an existing job listing
  async updateJob(jobId: string, jobData: Partial<IJob>) {
    const updatedJob = await jobModel.findByIdAndUpdate(
      new Types.ObjectId(jobId),
      { ...jobData, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedJob) {
      throw new Error('Job not found');
    }

    return this.convertJobDocToJob(updatedJob);

  }

  // Admin can delete a job listing
  async deleteJob(jobId: string) {

    const deletedJob = await jobModel.findByIdAndDelete(new Types.ObjectId(jobId));

    if (!deletedJob) {
      throw new Error('Job not found');
    }

    return this.convertJobDocToJob(deletedJob);

  }
}

export const adminJobService = new AdminJobService();
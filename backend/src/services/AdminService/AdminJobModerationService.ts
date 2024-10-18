import { Types } from 'mongoose';
import jobModel from '../../database/Job'; // Assuming JobModel is defined
import { IJob } from '../../database/Job'; // Assuming IJob is the job interface

class AdminJobModerationService {
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
      company: jobDoc.company,
      applicants: jobDoc.applicants,
      createdAt: jobDoc.createdAt,
      updatedAt: jobDoc.updatedAt,
    };
  }

  // Admin can approve a job listing
  async approveJob(jobId: string) {
    const updatedJob = await jobModel.findByIdAndUpdate(
      new Types.ObjectId(jobId),
      { listingStatus: 'approved', updatedAt: new Date() },
      { new: true }
    );

    if (!updatedJob) {
      throw new Error('Job not found');
    }

    return this.convertJobDocToJob(updatedJob);
  }

  // Admin can reject a job listing
  async rejectJob(jobId: string) {
    const updatedJob = await jobModel.findByIdAndUpdate(
      new Types.ObjectId(jobId),
      { listingStatus: 'rejected', updatedAt: new Date() },
      { new: true }
    );

    if (!updatedJob) {
      throw new Error('Job not found');
    }

    return this.convertJobDocToJob(updatedJob);
  }
}

export const adminJobModerationService = new AdminJobModerationService();

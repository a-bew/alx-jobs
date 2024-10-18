import { Types } from 'mongoose';
import userModel, { UserModel } from "../../database/UserModel";
import jobModel from "../../database/Job";
import applicationModel, { IApplication } from "../../database/JobApplication";

class JobApplicationService {

    // Get all job applications by a user
  async getUserApplications(userId: string) {
    const applications = await applicationModel.find({ user: new Types.ObjectId(userId) });

    if (!applications || applications.length === 0) {
      throw new Error('No applications found for the user');
    }

    return applications.map(this.convertApplicationDocToResponse);
  }

  // Submit a job application
  async submitJobApplication({jobId, userId, companyId, coverLetter, resumeUrl}:
   { jobId: string, 
    userId: string, 
    companyId: string, 
    coverLetter: string, 
    resumeUrl?: string}
  ) {
    const job = await jobModel.findById(new Types.ObjectId(jobId));

    if (!job) {
      throw new Error('Job not found');
    }

    // Create a new application document based on IApplication interface
    const newApplication:any = new applicationModel({
      user: new Types.ObjectId(userId),
      job: new Types.ObjectId(jobId),
      company: new Types.ObjectId(companyId),
      resumeUrl: resumeUrl || '',  // Optional resume URL
      coverLetter: coverLetter || '',  // Optional cover letter
      status: 'pending',  // Default status
      submittedAt: new Date(),  // Set submitted date
    });

    // Save the application and update the job with the new application reference
    await newApplication.save();

    job.applicants.push(newApplication._id);

    await job.save();

    return this.convertApplicationDocToResponse(newApplication);
  }

  // Helper function to convert application document to a response
  private convertApplicationDocToResponse(applicationDoc: any) {
    return {
      id: applicationDoc._id,
      user: applicationDoc.user,
      job: applicationDoc.job,
      company: applicationDoc.company,
      resumeUrl: applicationDoc.resumeUrl,
      coverLetter: applicationDoc.coverLetter,
      status: applicationDoc.status,
      submittedAt: applicationDoc.submittedAt,
      updatedAt: applicationDoc.updatedAt,
    };
  }

  // Withdraw application by updating status to 'withdrawn'
  async withdrawApplication(applicationId: string) {
    try {
      const updatedApplication = await applicationModel.findByIdAndUpdate(
        new Types.ObjectId(applicationId),
        { status: 'withdrawn' },  // Update status to 'withdrawn'
        { new: true }  // Return the updated document
      ).exec();

      if (!updatedApplication) {
        return null;
      }

      return this.convertApplicationDocToApplication(updatedApplication);
      
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

    // Get job application details by ID with populated user, job, and company details
    async getApplicationWithDetails(applicationId: string) {
        const application = await applicationModel.findById(new Types.ObjectId(applicationId))
          .populate('user')   // Fetch user details
          .populate('job')    // Fetch job details
          .populate('company')  // Fetch company details
          .exec();
    
        if (!application) {
          return null;
        } 

        return this.convertApplicationDocToApplication(application);
        
    }
    
      // Helper function to convert application document to a readable object
      private convertApplicationDocToApplication(applicationDoc: any) {
        return {
          id: applicationDoc._id.toString(),
          user: {
            id: applicationDoc.user._id.toString(),
            name: `${applicationDoc.user.firstName} ${applicationDoc.user.lastName}`,
            email: applicationDoc.user.email,
          },
          job: {
            id: applicationDoc.job._id.toString(),
            title: applicationDoc.job.title,
            description: applicationDoc.job.description,
          },
          company: {
            id: applicationDoc.company._id.toString(),
            name: applicationDoc.company.name,
          },
          resumeUrl: applicationDoc.resumeUrl,
          coverLetter: applicationDoc.coverLetter,
          status: applicationDoc.status,
          submittedAt: applicationDoc.submittedAt,
          updatedAt: applicationDoc.updatedAt
        };
      }
      
}

export const jobApplicationService = new JobApplicationService();
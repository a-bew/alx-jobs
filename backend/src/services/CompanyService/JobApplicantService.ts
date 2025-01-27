import { IApplication } from '../../database/JobApplication';
import { UserModel as IUser  } from '../../database/UserModel';
import JobApplication from '../../database/JobApplication';
import createHttpError from 'http-errors';
import Job from '../../database/Job';

class JobApplicantService {
  
  // Fetch all applicants for a specific job
  async getApplicantsForJob(jobId: string): Promise<IApplication[]> {
    const job = await Job.findById(jobId);
    
    if (!job) {
    //   throw new NotFoundError(`Job with ID ${jobId} not found`);
      throw createHttpError(404, `Job with ID ${jobId} not found`);
    }

    const applications = await JobApplication.find({ job: jobId }).populate('user');
    return applications;
  }

  // Fetch details of a specific applicant by application ID
  async getApplicantDetails(applicantId: string): Promise<IApplication> {
    const application = await JobApplication.findById(applicantId).populate('user');

    if (!application) {
        throw createHttpError(404, `Application with ID ${applicantId} not found`);
    }

    return application;
  }

  // Convert application document to detailed response with applicant info
  convertApplicationDocToApplicantResponse(application: IApplication): any {
    const applicant: IUser = application.user as unknown as IUser;

    return {
      applicationId: application._id,
      jobId: application.job,
      companyId: application.company,
      applicant: {
        id: applicant._id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        resumeUrl: application.resumeUrl,
        coverLetter: application.coverLetter,
      },
      status: application.status,
      submittedAt: application.submittedAt,
      updatedAt: application.updatedAt,
    };
  }
}

export const jobApplicantService = new JobApplicantService();

import { Document, Types } from "mongoose";
import jobModel, { IJob } from "../../database/Job";
import applicationModel, { IApplication } from "../../database/JobApplication";
import { JobStatusRoles } from "../../types";

// Job Document Type
type JobDoc = Document<unknown, NonNullable<unknown>, IJob> & Omit<IJob & { _id: Types.ObjectId }, never>;
// Application Document Type
type ApplicationDoc = Document<unknown, NonNullable<unknown>, IApplication> & Omit<IApplication & { _id: Types.ObjectId }, never>;

// Convert Job Document to a Plain Object
const convertJobDocToJob = (jobDoc: JobDoc | any) => ({
  id: jobDoc._id.toString(),
  title: jobDoc.title,
  description: jobDoc.description,
  requirements: jobDoc.requirements,
  salaryRange: jobDoc.salaryRange,
  location: jobDoc.location,
  jobType: jobDoc.jobType,
  isRemote: jobDoc.isRemote,
  listingStatus: jobDoc.listingStatus,
  applicants: jobDoc.applicants,
  createdAt: jobDoc.createdAt,
  updatedAt: jobDoc.updatedAt,
});


// Convert Application Document to a Plain Object
const convertApplicationDocToApplication = (applicationDoc: ApplicationDoc | any) => ({
  id: applicationDoc._id.toString(),
  job: applicationDoc.job.toString(),
  user: applicationDoc.user.toString(),
  resumeUrl: applicationDoc.resumeUrl,
  coverLetter: applicationDoc.coverLetter,
  status: applicationDoc.status,
  submittedAt: applicationDoc.submittedAt,
  updatedAt: applicationDoc.updatedAt,
});
 
class CompanyDashboardService {

  // Fetch jobs posted by a company
  async  getJobsByCompanyId (companyId: string): Promise<IJob|any[]>  {
    const jobDocs = await jobModel.find({ company: new Types.ObjectId(companyId) }).exec();

    return jobDocs.map(convertJobDocToJob);
  }

  // Fetch applications for a specific job
  async getApplicationsByJobId (jobId: string): Promise<IApplication|any[]> {
    const applicationDocs = await applicationModel.find({ job: new Types.ObjectId(jobId) }).exec();

    return applicationDocs.map(convertApplicationDocToApplication);
  }

  // Fetch a specific job by ID
  async getJobById (jobId: string): Promise<IJob|any | null> {
    const jobDoc = await jobModel.findById(new Types.ObjectId(jobId)).exec();

    if (!jobDoc) {
      return null;
    }

    return convertJobDocToJob(jobDoc);
  }

  // Fetch the application status of a specific applicant
  async getApplicationStatusByApplicantId (applicantId: string, jobId: string): Promise<IApplication | any | null> {
    const applicationDoc = await applicationModel.findOne({
      user: new Types.ObjectId(applicantId),
      job: new Types.ObjectId(jobId),
    }).exec();

    if (!applicationDoc) {
      return null;
    }

    return convertApplicationDocToApplication(applicationDoc);

  }

  // Update the status of a job (e.g., 'active', 'paused', 'closed')
  async updateJobStatus (jobId: string, status: JobStatusRoles): Promise<IJob | any | null> {
    const updatedJobDoc = await jobModel
      .findByIdAndUpdate(new Types.ObjectId(jobId), { listingStatus: status }, { new: true })
      .exec();

    if (!updatedJobDoc) {
      return null;
    }

    return convertJobDocToJob(updatedJobDoc);

  }
};

export const companyDashboardService = new CompanyDashboardService()
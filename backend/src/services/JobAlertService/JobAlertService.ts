import UserPreferenceModel from "../../database/UserPreferences";
import JobModel from "../../database/Job";
import sendEmail from "../../helpers/mailer/mailer"; // Email utility for sending emails

class JobAlertService  {
  // Method to send alerts when a new job is posted
  async sendJobAlertsForNewPosting (jobId: string) {
    const job = await JobModel.findById(jobId).exec();
    if (!job) {
      throw new Error("Job not found");
    }

    // Find users who have matching job preferences
    const matchingUsers = await UserPreferenceModel.find({
      preferredJobType: job.jobType,
      preferredLocation: job.location,
      isRemotePreferred: job.isRemote,
      preferredSalaryRange: job.salaryRange,
      notifyByEmail: true, // Only users who want to be notified
    }).populate('userId').exec();

    // Send email notifications to matching users
    matchingUsers.forEach(async (preference) => {
      const user:any = preference.user;

      if (user.email) {
        await sendEmail({
          to: user.email,
          subject: `New Job Posting: ${job.title}`,
          html: `A new job that matches your preferences has been posted! Job details:
          - Title: ${job.title}
          - Location: ${job.location}
          - Job Type: ${job.jobType}
          - Salary: ${job.salaryRange}
          Click here to apply: <job-link>`,
        });
      }
    });
  }
};

export const jobAlertService = new JobAlertService();
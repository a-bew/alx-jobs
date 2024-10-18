import applicationModel from '../../database/JobApplication'; // Assuming ApplicationModel is defined
import jobModel from '../../database/Job';

class AdminStatsService {
  // Fetch job application stats
  async getJobApplicationStats() {
    // Get total number of applications
    const totalApplications = await applicationModel.countDocuments();

    // Get applications grouped by status
    const applicationsByStatus = await applicationModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Fetch the total number of jobs for additional insight
    const totalJobs = await jobModel.countDocuments();

    // Format and return the stats in a serialized manner
    return {
      totalApplications,
      applicationsByStatus: applicationsByStatus.map((statusGroup) => ({
        status: statusGroup._id,
        count: statusGroup.count,
      })),
      totalJobs,
    };
  }
}

export const adminStatsService = new AdminStatsService();
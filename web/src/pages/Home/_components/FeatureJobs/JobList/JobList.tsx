// components/JobList/JobList.tsx
import { FC } from 'react';
import styles from './JobList.module.scss';
import { JobCard } from '../JobCards/JobCards';
import { JobPosting } from '../types';

interface JobListProps {
  jobs: JobPosting[];
}

export const JobList: FC<JobListProps> = ({ jobs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {jobs.map((job) => (
          <JobCard key={job.title} {...job} />
        ))}
      </div>
    </div>
  );
};

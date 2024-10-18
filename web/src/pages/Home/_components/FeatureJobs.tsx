import React from 'react'
import styles from './FeatureJobs.module.scss'
import { JobList } from './FeatureJobs/JobList/JobList'
import { jobs } from './data/featureJobExample'
import FeaturedJobsTitle from './FeatureJobs/FeaturedJobsTitle/FeaturedJobTitle';
import { Button } from '@/design-system/_components/Button/Button';

const FeatureJobs = () => {
  return (
    <div className={styles['feature-jobs']}>
            <FeaturedJobsTitle 
                itleNode={ <>Top<span className={styles.highlight}>Companies</span>Hiring Now</>} 
                subTitleText="Connect with leading companies that are looking for talent professionals like you." 
            />
            <JobList jobs={jobs} />

            <div className={styles.button}>
            {/* <Button>Default Button</Button> */}

                <Button  variant="primary" withArrow>Browse All Jobs</Button>
            </div>

    </div>
  )
}

export default FeatureJobs
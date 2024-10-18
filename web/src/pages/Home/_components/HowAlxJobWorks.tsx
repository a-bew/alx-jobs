import React from 'react'
import styles from './TopCompaniesHiring.module.scss';
import FeaturedJobsTitle from './FeatureJobs/FeaturedJobsTitle/FeaturedJobTitle';
import FeatureList from './HowAlxJobWorks/FeatureList/FeatureList';

const HowAlxJobWorks = () => {
  return (
    <div className={styles['feature-jobs']}>
            <FeaturedJobsTitle 
                itleNode={ <>How <span className={styles.highlight}>ALX Jobs</span>Works</>} 
                subTitleText="4 Simple Steps to Finding Your Dream Job Faster" 
            />
           
           <FeatureList />
    </div>
  )
}

export default HowAlxJobWorks
import React from 'react'
import styles from './TopCompaniesHiring.module.scss';
import FeaturedJobsTitle from './FeatureJobs/FeaturedJobsTitle/FeaturedJobTitle';
import BrandList from './TopCompaniesHiring/BrandList/BrandList';

const TopCompaniesHiring = () => {
  return (
    <div className={styles['feature-jobs']}>
            <FeaturedJobsTitle 
                itleNode={ <>Explore Our<span className={styles.highlight}>Featured Jobs</span></>} 
                subTitleText="4 Simple Steps to Finding Your Dream Job Faster" 
            />
           
           <BrandList />
    </div>
  )
}

export default TopCompaniesHiring
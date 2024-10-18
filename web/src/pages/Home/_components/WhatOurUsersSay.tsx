import React from 'react'
import styles from './TopCompaniesHiring.module.scss';
import FeaturedJobsTitle from './FeatureJobs/FeaturedJobsTitle/FeaturedJobTitle';
import FeatureList from './HowAlxJobWorks/FeatureList/FeatureList';
import TestimonialCarousel from './WhatOurUsersSay/TestimonialCarousel';

const WhatOurUsersSay = () => {
  return (
    <div className={styles['feature-jobs']}>
            <FeaturedJobsTitle 
                itleNode={ <>What our <span className={styles.highlight}>Users</span>Says</>} 
                subTitleText="Hear from professionals who have successfully found their dream job with us." 
            />
           
           <TestimonialCarousel />
    </div>
  )
}

export default WhatOurUsersSay
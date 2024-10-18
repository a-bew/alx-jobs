import React from 'react'
import styles from './BrowseByJobCategories.module.scss';
import FeaturedJobsTitle from './FeatureJobs/FeaturedJobsTitle/FeaturedJobTitle';
import FeatureList from './HowAlxJobWorks/FeatureList/FeatureList';
import JobCategoryList from './BrowseByJobCategories/JobCategoryList/JobCategoryList';
import { Button } from '@/design-system/_components/Button/Button';

const BrowseByJobCategories = () => {
  return (
    <div className={styles['feature-jobs']}>
            <FeaturedJobsTitle 
                itleNode={ <>Browse by <span className={styles.highlight}>Jobs Categories</span></>} 
                subTitleText="Find jobs that suit your expertise and interests. Select a category and start exploring" 
            />
           
           <JobCategoryList/>

          <div className={styles.button}>
            <Button   variant="secondary" withArrow>View All</Button>
          </div>
    </div>
  )
}

export default BrowseByJobCategories
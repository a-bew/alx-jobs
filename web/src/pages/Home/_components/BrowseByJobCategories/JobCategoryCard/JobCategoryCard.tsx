import React from 'react';
import { IconType } from 'react-icons';
import styles from './JobCategoryCard.module.scss';

interface JobCategoryCardProps {
  icon: IconType;
  category: string;
  openPositions: number;
  isActive?: boolean;
}

const JobCategoryCard: React.FC<JobCategoryCardProps> = ({ icon: Icon, category, openPositions, isActive }) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <Icon className={styles.icon} />
      <div className={styles.content}>
        <h3 className={styles.category}>{category}</h3>
        <p className={styles.positions}>{openPositions} Open position{openPositions > 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

export default React.memo(JobCategoryCard);

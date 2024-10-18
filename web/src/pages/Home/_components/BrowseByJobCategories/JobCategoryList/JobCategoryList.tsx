import React from 'react';
import { FaDatabase, FaBullhorn, FaCode, FaVideo, FaPencilRuler, FaHeartbeat } from 'react-icons/fa';
import JobCategoryCard from '../JobCategoryCard/JobCategoryCard';
import styles from './JobCategoryList.module.scss';

const categories = [
  { category: 'Data & Science', openPositions: 57, icon: FaDatabase, isActive: false },
  { category: 'Digital Marketing', openPositions: 297, icon: FaBullhorn, isActive: false },
  { category: 'Code & Programing', openPositions: 312, icon: FaCode, isActive: true },
  { category: 'Video & Animation', openPositions: 247, icon: FaVideo, isActive: false },
  { category: 'Graphics & Design', openPositions: 357, icon: FaPencilRuler, isActive: false },
  { category: 'Health & Care', openPositions: 125, icon: FaHeartbeat, isActive: false },
];

const JobCategoryList: React.FC = () => {
  return (
    <div className={styles.jobCategoryList}>
      {categories.map((category, index) => (
        <JobCategoryCard
          key={index}
          icon={category.icon}
          category={category.category}
          openPositions={category.openPositions}
          isActive={category.isActive}
        />
      ))}
    </div>
  );
};

export default React.memo(JobCategoryList);

import React from 'react';
import { FaUserPlus, FaUpload, FaBriefcase, FaPaperPlane } from 'react-icons/fa';
import styles from './FeatureList.module.scss';
import FeatureCard from '../FeatureCard/FeatureCard';

const features = [
  { title: 'Create Account', description: 'Create an account with your details to start organizing and managing your notifications today.', icon: FaUserPlus, isActive: false },
  { title: 'Upload CV/Resume', description: 'Create an account with your details to start organizing and managing your notifications today.', icon: FaUpload, isActive: true },
  { title: 'Find dream job', description: 'Create an account with your details to start organizing and managing your notifications today.', icon: FaBriefcase, isActive: false },
  { title: 'Apply', description: 'Create an account with your details to start organizing and managing your notifications today.', icon: FaPaperPlane, isActive: false },
];

const FeatureList: React.FC = () => {
  return (
    <div className={styles.featureList}>
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          isActive={feature.isActive}
        />
      ))}
    </div>
  );
};

export default React.memo(FeatureList);

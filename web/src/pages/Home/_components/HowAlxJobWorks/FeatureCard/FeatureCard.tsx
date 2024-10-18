import React from 'react';
import { IconType } from 'react-icons';
import styles from './FeatureCard.module.scss';

interface FeatureCardProps {
  icon: IconType;
  title: string;
  description: string;
  isActive?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, isActive }) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ''}`}>
      <Icon className={styles.icon} />
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export default React.memo(FeatureCard);
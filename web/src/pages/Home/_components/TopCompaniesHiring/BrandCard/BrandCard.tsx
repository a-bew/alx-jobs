import React from 'react';
import { IconType } from 'react-icons';  // IconType from react-icons for type safety
import styles from './BrandCard.module.scss';

interface BrandCardProps {
  icon: IconType;
  name: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ icon: Icon, name }) => {
  return (
    <div className={styles.card}>
      <Icon className={styles.icon} />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default React.memo(BrandCard);
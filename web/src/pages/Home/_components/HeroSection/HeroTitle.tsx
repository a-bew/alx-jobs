import React from 'react';
import styles from './HeroTitle.module.scss';

export const HeroTitle: React.FC = () => (
  <span role = 'heading' className={styles.heroTitle}>
    Your Next Opportunity <br /> is just A Click Away!
  </span>
);

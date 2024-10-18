import React from 'react';
import styles from './FeaturedJobsTitle.module.scss';

interface Props {
    itleNode: React.ReactNode;
    subTitleText: string;
}

const FeaturedJobsTitle= ({itleNode, subTitleText}: Props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}
      >
        {itleNode}
      </h1>
      <p className={styles.subtitle}>
        {subTitleText}
      </p>
    </div>
  );
};

export default React.memo(FeaturedJobsTitle);

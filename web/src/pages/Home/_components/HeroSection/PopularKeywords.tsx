import React from 'react';
import styles from './PopularKeywords.module.scss';

const keywords = ['Web Development', 'Product Design', 'Software Engineering', 'Data Analysis', 'Virtual Assistance', 'Professional Foundations', 'Artifical Intelligence', 'Aws Cloud Computing', 'Salesforce Administrator'];

export const PopularKeywords: React.FC = () => (
  <div className={styles.keywords}>
          <span key={-1}>Popular Keywords:</span>

    
    {keywords.map((keyword, index) => (
      <span key={index}>{keyword}</span>
    ))}
  </div>
);

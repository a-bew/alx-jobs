// components/JobCard/JobCard.tsx
import { FC } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';
import styles from './JobCard.module.scss';
import { JobPosting } from '../types';

export const JobCard: FC<JobPosting> = ({
  company,
  logo,
  title,
  salary,
  description,
  location,
  postedDate,
  icon: Icon,
  type,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.company}>
          {<Icon className={styles.logo} />}
          {/* <img src={logo} alt={`${company} logo`} className={styles.logo} /> */}
          <div>
            <h3>{company}</h3>
            <span>{postedDate}</span>
          </div>
        </div>
        <div className={styles.badge}>{type}</div>
        <button className={styles.menuButton}>
          <BsBookmark />
        </button>
      </div>
      
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.salary}>
          ${salary.min}k - ${salary.max}k
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.location}>
          <MdLocationOn />
          <span>{location}</span>
        </div>
        <button className={styles.applyButton}>Apply Now</button>
      </div>
    </div>
  );
};
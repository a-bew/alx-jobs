import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './HomeSearchBar.module.scss';

export const HomeSearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <FaSearch />
      <input type="text" placeholder="Job title, Keyword..." aria-label="Job Search" />
      <button>Browse Jobs</button>
    </div>
  );
};

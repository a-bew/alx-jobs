import React from 'react';
import styles from './straightwithmidtext.module.scss';

interface Props {
  text: string;
  className?: string;
  containerClass?: string;
}

const StraightWithMidText = ({text, className = styles['horizontal-bottom-line'], containerClass}: Props) => {
  return (
    <div className={`${styles["container"]} ${containerClass}`}>
      <hr className={`${styles["horizontal-line"]} ${className}`} style={{marginRight: '20px'}} />
      <span className={styles["text"]}>{text}</span>
      <hr className={`${styles["horizontal-line"]} ${className}`} style={{marginLeft: '20px'}}/>
    </div>
  );
}

export default StraightWithMidText;

import React from 'react';
import { FaGoogle, FaFacebookF, FaMicrosoft, FaApple, FaBehance, FaDribbble } from 'react-icons/fa';
import BrandCard from '../BrandCard/BrandCard';
import styles from './BrandList.module.scss';
import { TbBrandUpwork } from 'react-icons/tb';

const brands = [
  { name: 'Google', icon: FaGoogle },
  { name: 'Facebook', icon: FaFacebookF },
  { name: 'Microsoft', icon: FaMicrosoft },
  { name: 'Apple', icon: FaApple },
  { name: 'Behance', icon: FaBehance },
  { name: 'Dribbble', icon: FaDribbble },
  { name: 'Upwork', icon: TbBrandUpwork },
];

const BrandList: React.FC = () => {
  return (
    <div className={styles.brandList}>
      {brands.map((brand, index) => (
        <BrandCard key={index} icon={brand.icon} name={brand.name} />
      ))}
    </div>
  );
};

export default React.memo(BrandList);

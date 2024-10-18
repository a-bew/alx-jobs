import EntityIndicator from './HeroSection/AvatarGroup/AvatarGroup';
import styles from './HeroSection.module.scss';
import { HeroTitle } from './HeroSection/HeroTitle';
import { HomeSearchBar } from './HeroSection/HomeSearchBar';
import { PopularKeywords } from './HeroSection/PopularKeywords';
import AvatarGroup from './HeroSection/AvatarGroup/AvatarGroup';

export const HeroSection: React.FC = () => {

    const avatars = [
        { src: '', alt: '' },
        { src: '', alt: '' },
        { src: '', alt: '' },
        { src: '', alt: '' },
        { src: '', alt: '' },
        { src: '', alt: '' },
      ];
    
  return (
    <section className={styles.heroSection}>
      <div className={styles.left}>
        {/* <LoginForm /> */}
        <HeroTitle />
        <p className={styles.description}>
          Discover thousands of jobs tailored to your skills and goals. Start your journey to career success today!
        </p>
        <HomeSearchBar />
        {/* <EntityIndicator count={12} /> */}
        <PopularKeywords />

        <div className= {styles.popularKeywordsContainer}>
        
        <span className={styles.avatarGroupHeader}>Companies worldwide</span>

        <div className={styles.avatarGroupContainer}>
            <AvatarGroup avatars={avatars} maxCount={5} />
        </div>

        </div>

      </div>
      <div className={styles.right}>
        
      </div>
    </section>
  );
};
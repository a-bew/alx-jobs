import styles  from './Home.module.scss'
import { HeroSection } from './_components/HeroSection'
import FeatureJobs from './_components/FeatureJobs'
import TopCompanies from './_components/TopCompaniesHiring'
import HowAlxJobWorks from './_components/HowAlxJobWorks'
import BrowseByJobCategories from './_components/BrowseByJobCategories'
import WhatOurUsersSay from './_components/WhatOurUsersSay'
const Home = () => {
  return (
    <div className={styles['home-page']}>
        <HeroSection />
        <div style={{height: 600}}></div>
        <TopCompanies />
        <HowAlxJobWorks />
        <BrowseByJobCategories />
        <FeatureJobs />
        <WhatOurUsersSay />
    </div>
  )
}

export default Home
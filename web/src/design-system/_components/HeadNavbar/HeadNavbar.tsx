// Navbar.tsx
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './HeadNavbar.module.scss';
import ALXLOGO from '@/assets/alx-logo.png';
import { Link } from 'react-router-dom';

interface HeadNavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: HeadNavItem[];
}

const defaultNavItems: HeadNavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Categories', href: '/categories' },
  { label: 'Companies', href: '/companies' },
  { label: 'Contact Us', href: '/contact' },
];

const HeadNavbar: React.FC<NavbarProps> = ({
  logo = <img src={ALXLOGO} alt="ALX Jobs" className={styles.logo} />,
  items = defaultNavItems
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'unset';
  };

  const NavLinks = () => (
    <>
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={styles.navLink}
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            {logo}
            <span className={styles.logoText}>Jobs</span>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <NavLinks />
          </div>

          {/* Auth Buttons */}
          <div className={styles.authButtons}>
            <Link to="/signin"><button className={styles.btnGhost}>Login</button></Link>
            <Link to="/signup"><button className={styles.btnGhost}>Register</button></Link>
            <button className={styles.btnPrimary}>Post A Job</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`${styles.mobileNav} ${isMenuOpen ? styles.isOpen : ''}`}>
          <div className={styles.mobileNavContent}>
            <NavLinks />
            <div className={styles.mobileAuthButtons}>
              <button className={styles.btnGhost}>Login</button>
              <button className={styles.btnGhost}>Register</button>
              <button className={styles.btnPrimary}>Post A Job</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeadNavbar;
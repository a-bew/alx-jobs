// Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Button.module.scss';
import classNames from '@/design-system/utils/classNames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';
  
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Whether to show an arrow icon
   * @default false
   */
  withArrow?: boolean;
  
  /**
   * The position of the arrow
   * @default 'right'
   */
  arrowPosition?: 'left' | 'right';

  isLoading?: boolean; // New prop for loading state

}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'medium',
  withArrow = false,
  arrowPosition = 'right',
  isLoading = false, // Default to false
  className,
  disabled,
  children,
  ...props
}, ref) => {
  const buttonClasses = classNames(
    styles.button,
    styles[variant],
    styles[size],
    {
      [styles.disabled]: disabled || isLoading,
      [styles.withArrow]: withArrow,
      [styles.arrowLeft]: withArrow && arrowPosition === 'left',
      [styles.arrowRight]: withArrow && arrowPosition === 'right',
      [styles.loading]: isLoading,
    },
    className
  );

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <AiOutlineLoading3Quarters className={styles.spinner} />
      )}
      {arrowPosition === 'left' && withArrow && (
        <span className={styles.arrow}>→</span>
      )}
      {children}
      {arrowPosition === 'right' && withArrow && (
        <span className={styles.arrow}>→</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
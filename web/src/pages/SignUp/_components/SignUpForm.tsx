import React, { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import styles from './SignupForm.module.scss';
import { Input } from '@/design-system/_components/Input/Input';
import StraightWithMidText from '@/design-system/_components/StraightLineWithMidText/StraightWithMidText';
import { Button } from '@/design-system/_components/Button/Button';
import { Checkbox } from '@/design-system/_components/FormControls/Checkbox';
import { GrFacebookOption } from 'react-icons/gr';
import { FcGoogle } from 'react-icons/fc';
import useSignupForm from '../hooks/useSignupForm';


export const SignupForm: React.FC = () => {

    const {
        formData,  handleInputChange,
        errors,
        showPassword, setShowPassword,
        handleSubmit,
        showConfirmPassword, 
        setShowConfirmPassword,
        handleCheckboxChange
    } = useSignupForm()

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <span className={styles.title}>Create Account</span>
          <p>Join our platform and find your next job faster. It's easy and free!</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            <div className={styles['input-flex-horizontal']}>
                <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                />

                <Input
                    name="lastName"
                    placeholder="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                />
            </div>

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />

            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              showPasswordToggle
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <div className={styles.termsWrapper}>
                <Checkbox
                    checked={formData.acceptTerms}
                    onChange={(checked) => handleCheckboxChange( { name: 'acceptTerms', checked } )}
                />

              <label htmlFor="acceptTerms">
                I've read and agree with your{' '}
                <a href="#">Terms of Services</a>
              </label>
              {errors.acceptTerms && (
                <span className={styles.error}>{errors.acceptTerms}</span>
              )}
            </div>
          </div>

          <Button withArrow className={styles.submitButton}>
            Create Account
          </Button>
          <div className={styles.loginLink}>
            Already have account? <a href="#">Log In</a>
          </div>


          <StraightWithMidText text = "Or"  />

        <div className={styles.socialButtons}>
            <Button   className={styles.socialButton}>
              <GrFacebookOption size={20} color='#3498db'/>
              Sign up with Facebook
            </Button>
            <Button className={styles.socialButton}>
            <FcGoogle size={20} />

              Sign up with Google
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
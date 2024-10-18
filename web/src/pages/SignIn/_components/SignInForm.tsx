import React, { useState } from 'react';
import { GrFacebookOption } from 'react-icons/gr';
import {FcGoogle } from 'react-icons/fc';
import styles from './SignInForm.module.scss';
import { Input } from '@/design-system/_components/Input/Input';
import StraightWithMidText from '@/design-system/_components/StraightLineWithMidText/StraightWithMidText';
import { Button } from '@/design-system/_components/Button/Button';
import { Checkbox } from '@/design-system/_components/FormControls/Checkbox';
import useSignIn from '../hooks/useSignIn';


export const SignupForm: React.FC = () => {

  const { 
    formData,
    handleInputChange,
    errors,
    showPassword, setShowPassword,
    errMsg,
    userRef,
    errRef,
    handleSubmit,
    isLoading,
    handleOnChange
  } = useSignIn();


  return (
    <div className={styles.container}>
      <div className={styles.formCard}>


        <div className={styles.header}>
          <span className={styles.title}>Welcome back!</span>
          <p>Log in to access your profile and start applying for jobs</p>
        </div>
        <span ref = {errRef} className={styles[errMsg?'error-label': '']}>
          {errMsg}
        </span>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>

            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              autoComplete = {'off'}
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
              autoComplete = {'off'}
            />

          </div>

          <Button withArrow className={styles.submitButton}
            type="submit" isLoading={isLoading}
          >
          {isLoading ? 'Logging in...' : 'Log in'}
        </Button>

          <div className={styles.loginLink}>
            Don't have account? <a href="#">Create Account</a>
          </div>


          <StraightWithMidText text = "Or"  />

          <div className={styles.socialButtons}>
            <Button   className={styles.socialButton} >
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
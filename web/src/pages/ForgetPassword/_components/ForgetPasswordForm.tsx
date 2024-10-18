import React, { useState } from 'react';
import { GrFacebookOption } from 'react-icons/gr';
import {FcGoogle } from 'react-icons/fc';
import styles from './ForgetPasswordForm.module.scss';
import { Input } from '@/design-system/_components/Input/Input';
import StraightWithMidText from '@/design-system/_components/StraightLineWithMidText/StraightWithMidText';
import { Button } from '@/design-system/_components/Button/Button';
import { Checkbox } from '@/design-system/_components/FormControls/Checkbox';

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export const ForgetPasswordForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      // Example with form state management
      const [agreed, setAgreed] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Services';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = ({ name, checked }: { name: string; checked: boolean }) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <span className={styles.title}>Forget Password</span>
          <p>Enter the email you used to create your account, and we'll send you instructions to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />


            <div className={styles.termsWrapper}>
         
         <Checkbox
            checked={formData.acceptTerms}
            onChange={(checked) => handleCheckboxChange( { name: 'acceptTerms', checked } )}
          />
              <label htmlFor="acceptTerms" className={styles.forgetPassword}>
                <span>Remember me </span>
                <a href="#">Forget Password?</a>
              </label>


              {errors.acceptTerms && (
                <span className={styles.error}>{errors.acceptTerms}</span>
              )}
            </div>
          </div>

<div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
<Button withArrow className={styles.submitButton}>
            Send
          </Button>

          <Button variant="secondary" withArrow
          
          style={{ width: '100%' }}
          >Back to Log In</Button>

</div>


          <div className={styles.loginLink}>
            Don't have account? <a href="#">Create Account</a>
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
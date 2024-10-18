import React, { useState } from 'react';
import { GrFacebookOption } from 'react-icons/gr';
import {FcGoogle } from 'react-icons/fc';
import styles from './EmailVerificationForm.module.scss';
import { Input } from '@/design-system/_components/Input/Input';
import StraightWithMidText from '@/design-system/_components/StraightLineWithMidText/StraightWithMidText';
import { Button } from '@/design-system/_components/Button/Button';
import { Checkbox } from '@/design-system/_components/FormControls/Checkbox';

interface FormData {
  verifyCode: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  verifyCode?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export const EmailVerificationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    verifyCode: '',
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
    
    if (!formData.verifyCode.trim()) {
      newErrors.verifyCode = 'Verfication code is required';
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
          <span className={styles.title}>Email Verification</span>
          <p>We've sent a verification code to @email. Please check your email to activate your account.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formFields}>
            <Input
              type='text'
              name="verifyCode"
              placeholder="Verication Code"
              value={formData.verifyCode}
              onChange={handleInputChange}
              error={errors.verifyCode}
            />



          </div>

<div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
<Button withArrow className={styles.submitButton}>
            Verify My Account
          </Button>


</div>

          <div className={styles.loginLink}>
            Don't receive any code? <a href="#">Resend</a>
          </div>

        </form>
      </div>
    </div>
  );
};
import useNotification from '@/design-system/globalhook/useNotification';
import { useLoginMutation, useRegisterMutation } from '@/redux/authentication/features/authApiSlice';
import { setCredentials } from '@/redux/authentication/features/authSlice';
import {useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }
  
  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }
  
const useSignupForm = () => {

  const location =  useLocation()
  const from = location.state?.from?.pathname || '/';
  const {  showNotification } = useNotification();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef: any = useRef<HTMLInputElement>(null);

  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const formEmpty = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
  }

  const [formData, setFormData] = useState<FormData>(formEmpty);

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Full name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'lastName is required';
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

  const [register, {isLoading }] = useRegisterMutation();

  useEffect(() => {
      setErrMsg('');
  }, [formData.email, formData.password]) 

  useEffect(() => {
      userRef.current?.focus();
  }, [])  

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (validateForm()) {

      console.log('Form submitted:', formData);
      // Handle form submission here
      try {
          const userData = await register({...formData}).unwrap();
          console.log("userData", userData);
          // dispatch(setCredentials({...userData, email: formData.email}));
          setFormData(formEmpty);

          showNotification(userData.data.message, 'top-right', 'default', 100000);


          navigate(from, {replace: true});

      } catch (err: any) {
          console.log("err", err)
          if ( 'errors' in err.data){
              if (err?.data?.errors?.length > 0){
                  err.data.errors.map((data: { message: string; }, index: any)=>
                      showNotification(data.message, 'top-right', 'urgent', 100000))

              } else {
                  
                  showNotification(err.data.errors.message, 'top-right', 'urgent', 100000)
              }
          } else {
              setErrMsg(err.data.message)
              showNotification(err.data.message, 'top-right', 'urgent');

          }

          errRef?.current?.focus();

      }
        
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
    
  return {
    formData,  
    handleInputChange,
    errors,
    showPassword, 
    setShowPassword,
    errMsg,
    userRef,
    errRef,
    handleSubmit,
    isLoading,
    showConfirmPassword, 
    setShowConfirmPassword,
    handleCheckboxChange
  }
  
}

export default useSignupForm
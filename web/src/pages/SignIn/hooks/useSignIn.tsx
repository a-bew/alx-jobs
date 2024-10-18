import useNotification from '@/design-system/globalhook/useNotification';
import { useLoginMutation } from '@/redux/authentication/features/authApiSlice';
import { setCredentials } from '@/redux/authentication/features/authSlice';
import {useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}
  
const useSignIn = () => {

    const location =  useLocation()
    const from = location.state?.from?.pathname || '/';
    const {  showNotification } = useNotification();

    const userRef = useRef<HTMLInputElement>(null);
    const errRef: any = useRef<HTMLInputElement>(null);

    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    
    
    const validateForm = (): boolean => {

        const newErrors: FormErrors = {};
        
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
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const [login, {isLoading }] = useLoginMutation();

    useEffect(() => {
        setErrMsg('');
    }, [formData.email, formData.password]) 

    useEffect(() => {
        userRef.current?.focus();
    }, [])  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (validateForm()) {

            console.log('Form submitted:', formData);
          // Handle form submission here
          try {
            const userData = await login({...formData}).unwrap();
            dispatch(setCredentials({...userData, email: formData.email}));
            setFormData({email: '', password: ''});

            navigate(from, {replace: true});
          } catch (err: any) {
            console.log("err", err)
            // if (!err?.response){
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            setErrMsg(err.data.message)
            showNotification(err.data.message, 'top-right', 'urgent');
            errRef?.current.focus();

          }

        }
        
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return {
        formData,  handleInputChange,
        errors,
        showPassword, setShowPassword,
        errMsg,
        userRef,
        errRef,
        handleSubmit,
        isLoading,
        handleOnChange
    }

}

export default useSignIn;
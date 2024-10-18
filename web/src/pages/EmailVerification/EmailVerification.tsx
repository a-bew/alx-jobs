import React, { useEffect } from 'react'
import styles from './EmailVerification.module.scss'
import { EmailVerificationForm } from './_components/EmailVerificationForm'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useNotification from '@/design-system/globalhook/useNotification';
import { useVerifyEmailMutation } from '@/redux/authentication/features/authApiSlice';

const EmailVerification = () => {

  const location =  useLocation()
  const from = location.state?.from?.pathname || '/';

  const navigate = useNavigate()
  const params = useParams();
  const verifyToken = params.verifyToken;

  const [verifyEmail, {isLoading }] = useVerifyEmailMutation();

  const {  showNotification } = useNotification();
console.log("params", params)
  const handleSubmitToken = async () => {
        // Handle form submission here
        try {
           if (verifyToken){
            const userData = await verifyEmail(verifyToken).unwrap();
            showNotification(userData.data.message, 'top-right', 'default', 100000);
            navigate('/signin', {replace: true})
           } else {
             throw new Error("Invalid Request")
           }
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

                showNotification(err.data.message, 'top-right', 'urgent');

            }

        }
  };

  useEffect(() => {
    (async ()=>{
      await handleSubmitToken()
    })()
  }, [verifyToken])

  return (
    <div className={styles['signup-container']}>
    

    <div className={styles['body']}>

        <div className={styles['banner-container']}>
        <div className={styles['banner']}>
    {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure debitis, distinctio ipsam fugiat aliquid deserunt beatae totam quas mollitia ipsa? Amet repellendus, perspiciatis recusandae earum tempore facere quisquam error necessitatibus. */}
          </div>

        </div>
            <div className={styles['signup-form']}>
                {/* <EmailVerificationForm /> */}
                {isLoading? <span>...Loading</span>: <span>Your Email is verified. Please go to <Link to = '/signin'>Login</Link></span> }
            </div>    

    </div>
    </div>
  )
}

export default EmailVerification


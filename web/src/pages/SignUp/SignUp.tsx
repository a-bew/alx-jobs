import React from 'react'
import styles from './SignUp.module.scss'
import { SignupForm } from './_components/SignUpForm'

const SignUp = () => {
  return (
    <div className={styles['signup-container']}>
    

    <div className={styles['body']}>

        <div className={styles['banner-container']}>
        <div className={styles['banner']}>
            </div>

        </div>

            <div className={styles['signup-form']}>
                <SignupForm />
            </div>    

    </div>
    </div>
  )
}

export default SignUp
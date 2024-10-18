import React from 'react'
import styles from './ResetPassword.module.scss'
import { SignupForm } from './_components/ResetPasswordForm'

const ResetPassword = () => {
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

export default ResetPassword
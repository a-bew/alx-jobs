import styles from './SignIn.module.scss'
import { SignupForm } from './_components/SignInForm'

const SignIn = () => {
  return (
    <div className={styles['signup-container']}>
    

    <div className={styles['body']}>

        <div className={styles['banner-container']}>
        <div className={styles['banner']}>
    {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure debitis, distinctio ipsam fugiat aliquid deserunt beatae totam quas mollitia ipsa? Amet repellendus, perspiciatis recusandae earum tempore facere quisquam error necessitatibus. */}
            </div>

        </div>

            <div className={styles['signup-form']}>
                <SignupForm />
            </div>    

    </div>
    </div>
  )
}

export default SignIn
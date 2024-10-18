import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { lazy, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './design-system/_components/Button/Button'
import Logo from './design-system/_components/Logo/Logo'
import { InputField } from './design-system/_components/InputField/InputField'
import { Radio } from './design-system/_components/FormControls/Radio'
import { Checkbox } from './design-system/_components/FormControls/Checkbox';
import LayoutOutlet from './layout/LayoutOutlet';
import ErrorPage from './error/ErrorPage';
import RequireAuth from './redux/authentication/features/RequireAuth';
import SideNotification from './design-system/_components/SideNotification/SideNotification';
import RequireAuthWithRoles from './redux/authentication/features/RequireAuthWithRoles';
// import useNotification from './design-system/globalhook/useNotification';

const SignUp = lazy(() => import('./pages/SignUp/SignUp'))
const WelcomeBack = lazy(() => import('./pages/SignIn/SignIn'))
const ForgotPassword = lazy(() => import('./pages/ForgetPassword/ForgetPassword'))
const EmailVerification = lazy(() => import('./pages/EmailVerification/EmailVerification'))
const CheckYourEmail = lazy(() => import('./pages/CheckYourEmail/CheckYourEmail'))
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'))

const Home = lazy(() => import('./pages/Home/Home'))


// Design System View
export const ExampleComponent: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Primary Buttons */}
      <Button>Default Button</Button>
      <Button withArrow>With Arrow</Button>
      <Button size="large" withArrow>Large Button</Button>
      
      {/* Secondary Buttons */}
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary" withArrow>Secondary with Arrow</Button>
      
      {/* Tertiary Buttons */}
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="tertiary" withArrow>Tertiary with Arrow</Button>
      
      {/* Disabled State */}
      <Button disabled>Disabled Button</Button>
    </div>
  );
};

export const ExampleComponent2: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tertiary Buttons */}
            <InputField 
        label="Username"
        placeholder="Enter your username"
        helperText="This will be your display name"
      />

      {/* // With error state */}
      <InputField 
        label="Email"
        placeholder="Enter your email"
        error="Please enter a valid email address"
      />

      {/* // With success state */}
      <InputField 
        label="Password"
        type="password"
        placeholder="Enter your password"
        success="Password meets requirements"
      />

      {/* // Disabled state */}
      <InputField 
        label="Account ID"
        placeholder="Account ID"
        disabled
      />

      {/* // Secondary variant */}
      <InputField 
        label="Profile URL"
        placeholder="Enter profile URL"
        variant="secondary"
      />
    </div>
  );
};

export const ExampleComponent3: React.FC = () => {

        // Example with form state management
        const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tertiary Buttons */}
      <InputField 
        label="Username"
        placeholder="Enter your username"
        helperText="This will be your display name"
        variant="secondary"
      />

        {/* // Example usage with links in the label */}
        <Checkbox>
          I agree to the <a href="/agreement">User Agreement</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Checkbox>

        <Radio>
          I agree to the <a href="/agreement">User Agreement</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Radio>

        {/* // With error state */}
        <Checkbox error>
          I agree to the <a href="/agreement">User Agreement</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Checkbox>

        {/* // Disabled state */}
        <Checkbox disabled>
          I agree to the <a href="/agreement">User Agreement</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Checkbox>

        <Checkbox
          checked={agreed}
          onChange={setAgreed}
        >
          I agree to the <a href="/agreement">User Agreement</a> and{' '}
          <a href="/privacy">Privacy Policy</a>
        </Checkbox>
    </div>
  );
}

export const AppUX = ()=>{
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}

        </a>
      </div>
      <h1>Vite + React</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, distinctio, architecto aliquam adipisci error provident molestiae praesentium quidem quia voluptatem, consequuntur esse natus cumque nam. Molestiae ipsum quos nulla ad.</p>
      <Logo size={64} />

      <div className="card">
        <Button variant='secondary' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ExampleComponent />
      <ExampleComponent2 />
      <ExampleComponent3 />
    </>
  )
}

// Routes
const App = () => {

// Object lookup

  return (
    <>

<BrowserRouter>
      <Routes>
        <Route  element={<LayoutOutlet />}>

        <Route path='/' element={<Home />} />

          <Route path='/ux' element={<AppUX />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<WelcomeBack />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-email/:verifyToken' element={<EmailVerification />} />
          <Route path='/check-your-email' element={<CheckYourEmail />} />
          <Route path='/reset-password/:reset-token' element={<ResetPassword />} />

          <Route element = {<RequireAuthWithRoles allowedRoles={['user']} />} >
              <Route path='/candidate/profile' element = {<></>} />
              <Route path='/candidate/dashboard' element = {<></>} />
              <Route path='/job/:id/details' element = {<></>} />
              <Route path='/job/:id/apply' element = {<></>} />
          </Route>
        
          <Route element = {<RequireAuthWithRoles allowedRoles={['admin']} />} >
            <Route path='/admin/profile' element = {<></> } />
            {/* <Route path='/admin/profile' element = {<></> } />
            <Route path='/admin/profile' element = {<></> } /> */}

          </Route>

          <Route element = {<RequireAuthWithRoles allowedRoles={['company']} />} >
            <Route path='/company/profile' element = {<></> } />
            {/* <Route path='/company/profile' element = {<></> } />
            <Route path='/company/profile' element = {<></> } /> */}

          </Route>

          <Route path="/error" element={<ErrorPage />} />
          <Route element={<ErrorPage />} />
          <Route path='*' element={<Navigate replace to="/error" />} />

        </Route>
    </Routes>
    </BrowserRouter>

    </>
  )
} 

export default App
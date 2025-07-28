import React, { useState } from 'react';
import { Email, Lock, Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import UserService from '../../service/userService';
import { loginPageProps, registrationProps } from '../Types/types';
import { useNavigate } from 'react-router-dom';
import CustomSnackbar from '../SnackBar/CustomSnackbar'; // Assuming this path is correct
import { snackbar } from '../Types/types'; // Assuming this type is correct
import './loginPage.css'; // Assuming this path is correct

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarState, setSnackbarState] = useState<snackbar>({ // Renamed to avoid conflict with imported type
    snackbarOpen: false,
    snackBarMessage: '',
    snackbarType: 'success'
  });
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<loginPageProps>({
    email: '',
    password: ''
  })
  const [registerData, setRegisterData] = useState<registrationProps>({
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault();
        if (isLogin) {
            const response = await UserService.login({
                email: loginData.email,
                password: loginData.password
            });
            if(response && response.status === 200){
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                navigate('/dashboard');
            } else {
              setSnackbarState({snackbarOpen: true, snackBarMessage: 'Login failed. Please check your credentials', snackbarType: 'error'});
            }
        } else {
            if (registerData.password !== registerData.confirmPassword) {
              setSnackbarState({snackbarOpen: true, snackBarMessage: 'Passwords do not match', snackbarType: 'error'});
              return;
            }
            const response = await UserService.register({
                email: registerData.email,
                password: registerData.password,
                isAdmin: registerData.isAdmin
            });
            if(response && response.status === 200) {
                setSnackbarState({snackbarOpen: true, snackBarMessage: 'Registration successful!', snackbarType: 'success'});
                setIsLogin(true); // Switch to login form after successful registration
            } else {
                setSnackbarState({snackbarOpen: true, snackBarMessage: 'Registration failed. Please try again.', snackbarType: 'error'});
            }
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        setSnackbarState({snackbarOpen: true, snackBarMessage: 'An error occurred. Please try again later.', snackbarType: 'error'});
    } finally {
        // Clear sensitive data after submission attempt
        setLoginData({ email: '', password: '' });
        setRegisterData({ email: '', password: '', confirmPassword: '', isAdmin: false });
        setShowPassword(false);
        setShowConfirmPassword(false);
    }
  };

  const toggleForm = () => { // Renamed to camelCase
    try {
        setIsLogin(!isLogin)
    } catch (error) {
        console.error("Error toggling form:", error);
        setSnackbarState({snackbarOpen: true, snackBarMessage: 'Error toggling form. Please try later', snackbarType: 'error'});
    } finally {
        setLoginData({ email: '', password: '' });
        setRegisterData({ email: '', password: '', confirmPassword: '', isAdmin: false });
        setShowPassword(false);
        setShowConfirmPassword(false);
    }
  }

  return (
    <div className="login-page-container">
      {/* Abstract background elements - simplified */}
      <div className="background-shapes"></div>

      <div className="auth-panel">
        <div className="quiz-logo-container">
          <span className="quiz-logo-text">Q</span>
        </div>
        <h2 className="auth-title">
          {isLogin ? 'Welcome Back!' : 'Create Your Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {isLogin ? (
            <>
              <div className="input-field-group">
                <Email className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="input-field-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-visibility-btn"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="input-field-group">
                <Email className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="input-field-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-visibility-btn"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <div className="input-field-group">
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  placeholder="Confirm Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="toggle-visibility-btn"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
              <div className="admin-checkbox-group">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={registerData.isAdmin}
                  onChange={e => setRegisterData({ ...registerData, isAdmin: e.target.checked })}
                />
                <label htmlFor="isAdmin">Register as Admin</label>
              </div>
            </>
          )}

          <button type="submit" className="submit-auth-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="form-toggle-area">
          <button
            onClick={toggleForm}
            className="toggle-auth-mode-btn"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      <CustomSnackbar 
        message = {snackbarState.snackBarMessage}
        type = {snackbarState.snackbarType}
        open = {snackbarState.snackbarOpen}
        onClose={() => setSnackbarState({snackbarOpen: false, snackBarMessage: '', snackbarType: 'success'})}
      />
    </div>
  );
};

export default LoginPage;
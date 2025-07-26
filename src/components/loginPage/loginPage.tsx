import React, { useState } from 'react';
import { Email, Lock, Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import UserService from '../../service/userService';
import { loginPageProps, registrationProps } from '../Types/types';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        }
        } else {
        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        const response = await UserService.register({
            email: registerData.email,
            password: registerData.password,
            isAdmin: registerData.isAdmin
        });
        console.log(response);
        }
    } catch (error) {
        console.error("Error during form submission:", error);
    } finally {
        setLoginData({ email: '', password: '' });
        setRegisterData({ email: '', password: '', confirmPassword: '', isAdmin: false });
        setShowPassword(false);
        setShowConfirmPassword(false);
    }
  };

  const toogleForm = () => {
    try {
        setIsLogin(!isLogin)
    } catch (error) {
        console.error("Error toggling form:", error);
    } finally {
        setLoginData({ email: '', password: '' });
        setRegisterData({ email: '', password: '', confirmPassword: '', isAdmin: false });
        setShowPassword(false);
        setShowConfirmPassword(false);
    }
  }

  return (
    <div className="login-container">
      <div className="quiz-pattern"></div>
      <div className="floating-elements"></div>
      <div className="login-card">
        <div className="quiz-logo">
          <span>Q</span>
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '2rem', color: '#1a365d' }}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        {isLogin ? (
            <>
            <div className="input-group">
                <Email className="icon" />
                <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={e =>
                    setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder="Email address"
                required
                />
            </div>
            <div className="input-group">
                <Lock className="icon" />
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={loginData.password}
                onChange={e =>
                    setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="Password"
                required
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>
            </>
        ) : (
            <>
            <div className="input-group">
                <Email className="icon" />
                <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={e =>
                    setRegisterData({ ...registerData, email: e.target.value })
                }
                placeholder="Email address"
                required
                />
            </div>
            <div className="input-group">
                <Lock className="icon" />
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={registerData.password}
                onChange={e =>
                    setRegisterData({ ...registerData, password: e.target.value })
                }
                placeholder="Password"
                required
                />
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>
            <div className="input-group">
                <Lock className="icon" />
                <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={e =>
                    setRegisterData({ ...registerData, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
                required
                />
                <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password"
                >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>
            <div className="admin-checkbox">
                <input
                type="checkbox"
                name="isAdmin"
                checked={registerData.isAdmin}
                onChange={e =>
                    setRegisterData({ ...registerData, isAdmin: e.target.checked })
                }
                />
                <label>Register as Admin</label>
            </div>
            </>
        )}

        <button type="submit" className="submit-button">
            {isLogin ? 'Sign In' : 'Create Account'}
        </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={toogleForm}
            className="toggle-form"
          >
            {isLogin ? "Don't have a account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
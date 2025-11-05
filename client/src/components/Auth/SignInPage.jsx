import React, { useState } from 'react';
import { Shield, Eye, EyeOff, XCircle } from 'lucide-react';
import Logo from '../common/Logo';
import LoaderButton from '../common/LoaderButton';

const SignInPage = ({ onAuthSuccess, users, switchToSignUp }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    const user = users[formData.email];
    if (user && user.password === formData.password) onAuthSuccess(formData.email);
    else setErrors({ general: 'Invalid email or password' });
    setIsLoading(false);
  };

  const handleKeyPress = (e) => e.key === 'Enter' && handleSubmit();

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12 text-white">
        <div>
          <Shield className="w-20 h-20 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Secure Your Codebase</h1>
          <p className="text-xl text-purple-100">
            Advanced secret scanning and security best practices for your development workflow
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back to Stackguard
            </h2>
            <p className="text-gray-600">
              Secure your codebase with advanced secret scanning
            </p>
          </div>

          <div className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                {errors.general}
              </div>
            )}

            <input
              type="email"
              placeholder="Enter email ID"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                errors.email ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyPress={handleKeyPress}
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.password ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <LoaderButton onClick={handleSubmit} isLoading={isLoading} loadingText="Signing in...">
              Sign In
            </LoaderButton>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <span
                onClick={switchToSignUp}
                className="text-purple-700 font-medium cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

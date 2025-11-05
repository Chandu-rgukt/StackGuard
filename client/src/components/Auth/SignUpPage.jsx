import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import Logo from '../common/Logo';
import LoaderButton from '../common/LoaderButton';

const SignUpPage = ({ onAuthSuccess, switchToSignIn, users, setUsers }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email))
      newErrors.email = 'Please enter a valid email';
    else if (users[formData.email]) newErrors.email = 'Email already exists';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 800));

    setUsers({
      ...users,
      [formData.email]: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password
      }
    });

    onAuthSuccess(formData.email);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 items-center justify-center p-12 text-white">
        <div>
          <Shield className="w-20 h-20 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Join Stackguard</h1>
          <p className="text-xl text-purple-100">
            Start securing your codebase with enterprise-grade security tools
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Stackguard</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.firstName ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <input
                type="text"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.lastName ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>

            <input
              type="email"
              placeholder="Enter email ID"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                errors.email ? 'border-red-500' : 'border-transparent'
              } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-lg bg-gray-100 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-transparent'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <LoaderButton
              onClick={handleSubmit}
              isLoading={isLoading}
              loadingText="Creating account..."
              variant="secondary"
            >
              Create account
            </LoaderButton>

            <p className="text-center text-sm text-gray-600 pt-4">
              Already have an account?{' '}
              <span
                onClick={switchToSignIn}
                className="text-purple-700 font-medium hover:text-purple-800 cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

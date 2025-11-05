import React, { useState, useEffect } from 'react';
import SignInPage from './components/Auth/SignInPage';
import SignUpPage from './components/Auth/SignUpPage';
import ConfigPage from './components/Config/ConfigPage';
import DashboardPage from './components/Dashboard/DashboardPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasConfigKey, setHasConfigKey] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash === 'signup') setCurrentPage('signup');
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('config');
  };

  const handleConfigSuccess = () => {
    setHasConfigKey(true);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setHasConfigKey(false);
    setCurrentPage('signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {currentPage === 'signin' && (
        <SignInPage
          onAuthSuccess={handleAuthSuccess}
          users={users}
          switchToSignUp={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <SignUpPage
          onAuthSuccess={handleAuthSuccess}
          switchToSignIn={() => setCurrentPage('signin')}
          users={users}
          setUsers={setUsers}
        />
      )}
      {currentPage === 'config' && isAuthenticated && (
        <ConfigPage onConfigSuccess={handleConfigSuccess} onSignOut={handleSignOut} />
      )}
      {currentPage === 'dashboard' && isAuthenticated && hasConfigKey && (
        <DashboardPage onSignOut={handleSignOut} />
      )}
    </div>
  );
};

export default App;

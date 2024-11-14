import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuthContext();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(credentials.email, credentials.password);
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      // Error is handled by the auth hook
    }
  };

  return (
    <div className="min-h-screen cyber-bg flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="flex items-center space-x-2 mb-6">
          <LogIn className="w-6 h-6 text-neon-primary" />
          <h2 className="text-2xl font-bold text-white">Σύνδεση</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
            autoComplete="current-password"
          />

          {error && (
            <div className="text-red-500 text-sm bg-red-100/10 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Σύνδεση...' : 'Σύνδεση'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
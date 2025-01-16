// app/register/page.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../utils/auth';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.register(
        formData.username,
        formData.email,
        formData.password
      );
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              name="username"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 mb-4"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 mb-4"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
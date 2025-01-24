// Frontend: Dashboard.tsx (React Component)
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const authService = {
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default function Dashboard() {
  const [content, setContent] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);

    const fetchContent = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        };

        let endpoint = '/test/user';
        if (currentUser.roles.includes('ROLE_ADMIN')) {
          endpoint = '/test/admin';
        } else if (currentUser.roles.includes('ROLE_MODERATOR')) {
          endpoint = '/test/mod';
        }

        const response = await axios.get<string>(
          `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
          config
        );
        setContent(response.data);
      } catch (error: any) {
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          if (message === 'Session timeout expired. Please sign in again.') {
            alert(message);
            authService.logout();
            router.push('/login?message=Session timeout expired. Please sign in again.');
          }
        } else {
          console.error('Error fetching content:', error);
        }
      }
    };

    fetchContent();
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
          {user && (
            <div className="mb-4">
              <p className="text-gray-600">Welcome, {user.username}!</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Roles: {user.roles.join(', ')}</p>
            </div>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Content</h2>
            <div className="p-4 bg-gray-100 rounded">
              {content || 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

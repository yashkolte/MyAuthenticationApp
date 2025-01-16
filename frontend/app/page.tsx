"use client";

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="h-screen bg-gray-50 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-5xl">
            Welcome to{' '}
            <span className="text-indigo-600">My Authentication App</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A secure authentication system built with Next.js, TypeScript, and Spring Boot JWT authentication.
          </p>

          {!user ? (
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-2 md:text-lg md:px-10"
                >
                  Get Started
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-2 md:text-lg md:px-10"
                >
                  Sign In
                </Link>
              </div>
            </div>

          ) : null}

        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">Secure Authentication</h3>
              <p className="mt-2 text-gray-500">
                JWT-based authentication system with role-based access control.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">Modern Stack</h3>
              <p className="mt-2 text-gray-500">
                Built with Next.js 13+, TypeScript, and Spring Boot.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
              <p className="mt-2 text-gray-500">
                Complete user management system with multiple roles and permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
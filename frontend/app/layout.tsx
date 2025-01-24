// app/layout.tsx
import { Navbar } from '@/app/components/Navbar';
import { AuthProvider } from '@/app/contexts/AuthContext';
import './globals.css';

export const metadata = {
  title: 'My Authentication App',
  description: 'A secure authentication system built with Next.js and Spring Boot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
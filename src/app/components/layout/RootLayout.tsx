import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function RootLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && <Navbar />}
      <main className={!isLoginPage ? 'pt-16' : ''}>
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

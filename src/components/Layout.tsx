import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';

const Layout = () => {
  return (
    <div className="min-h-screen cyber-bg">
      <MainNav />
      <main className="pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
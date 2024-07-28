// src/components/layout/Layout.js
import React from 'react';
import Navbar from '../common/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;

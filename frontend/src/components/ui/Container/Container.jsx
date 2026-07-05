import React from 'react';

const MAX_W = {
  sm:   'max-w-xl',
  md:   'max-w-3xl',
  lg:   'max-w-5xl',
  xl:   'max-w-7xl',
  full: 'max-w-none',
};

const Container = ({ size = 'xl', className = '', children }) => (
  <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${MAX_W[size] ?? MAX_W.xl} ${className}`}>
    {children}
  </div>
);

export default Container;

/**
 * The code below is a functional component in JavaScript that represents the header section of the
 * website, including a responsive menu and logo.
 * @returns The `Header` component is returning a JSX element representing the header section of a
 * website.
 **/

// Importing necessary dependencies
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Import Icon
import {LogoIcon} from '../assets/icons';

// Functional component for the header section
const Header = () => {
  // State variables for menu toggling and screen size
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Effect hook to handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia('(max-width: 500px)').matches);
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle menu item & handle logo click
  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setIsMenuToggled(false);
  };

  const handleLogoClick = () => {
    // Close the menu when the logo is clicked
    setIsMenuToggled(false);
  };

  return (
    <header className="flex justify-between border-b border-white border-solid border-white-500 py-4 sm:p-6 relative z-10">
      {/* Logo and brand name */}
      <Link href="/" className="flex gap-1 text-2xl font-semibold items-center" onClick={handleLogoClick}>
        <LogoIcon />
        <div className="text-white">Lingua<span className="text-blue-300">Tune</span></div>
      </Link>

      {/* Conditional rendering based on screen size */}
      {isSmallScreen ? (
        <>
          {/* Hamburger menu button */}
          {!isMenuToggled && (
            <button onClick={() => setIsMenuToggled(true)} className="focus:outline-none">
              <span className="text-white text-2xl">☰</span>
            </button>
          )}
          {/* Expanded menu on mobile */}
          {isMenuToggled && (
            <div className="fixed top-0 right-0 h-screen w-1/4 bg-gray-900 flex flex-col z-50">
              <div className="flex justify-end p-4">
                {/* Close button */}
                <button onClick={() => setIsMenuToggled(false)} className="focus:outline-none">
                  <span className="hover:text-blue-300 text-white text-4xl">×</span>
                </button>
              </div>
              <div className="flex flex-col p-4 gap-2 z-50 text-white">
                {/* Menu links */}
                <Link className="hover:text-blue-300 text-2xl" href="/" onClick={handleMenuItemClick}>Home</Link>
                <Link className="hover:text-blue-300 smooth-scroll text-2xl" href="/#about" onClick={handleMenuItemClick}>About</Link>
                <Link className="hover:text-blue-300 text-2xl" href="/" onClick={handleMenuItemClick}>New+</Link>
              </div>
            </div>
          )}
        </>
      ) : (
        // Menu links for larger screens
        <nav className="flex items-center gap-6 sm:gap-8 text-white cursor-pointer text-xl">
          <Link className="hover:text-blue-300" href="/">Home</Link>
          <Link className="hover:text-blue-300 smooth-scroll" href="/#about">About</Link>
          <button className="flex items-center justify-center bg-black hover:text-blue-300 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full text-slate-950 space-x-3 text-white">
            <Link className="hover:text-blue-300" href="/">New+</Link>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;

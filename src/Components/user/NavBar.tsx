import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import FundraiserBtn from './FundraiserBtn';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-fuchsia-900 shadow-lg py-4 z-50 relative">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-12 mr-6" />
        </div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-blue-300">Home</a>
          <a href="#donate" className="text-white hover:text-blue-300">Donate</a>
          <a href="#about" className="text-white hover:text-blue-300">About Us</a>
          <a href="#contact" className="text-white hover:text-blue-300">Contact Us</a>
        </div>

        {/* Buttons for Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <FundraiserBtn />
          <CgProfile size={28} className="text-white cursor-pointer hover:text-blue-300" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-fuchsia-800 text-white py-4 px-6 space-y-4 absolute w-full top-full left-0">
          <a href="#home" className="block text-lg hover:text-blue-300">Home</a>
          <a href="#donate" className="block text-lg hover:text-blue-300">Donate</a>
          <a href="#about" className="block text-lg hover:text-blue-300">About Us</a>
          <a href="#contact" className="block text-lg hover:text-blue-300">Contact Us</a>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Start a Fundraiser
          </button>
          <div className="flex justify-center">
            <CgProfile size={28} className="cursor-pointer hover:text-blue-300" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

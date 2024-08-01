import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import FundraiserBtn from './FundraiserBtn';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { userLogout } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const NavBar : React.FC = () => {  
  const [menuOpen, setMenuOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userLogout());
    cookies.remove('jwt');
    googleLogout();
  };

  const handleProfile = () => {
    navigate('/profile');
  }

  return (
    <nav className=" shadow-lg  z-50 relative" style={{background:'#55AD9B'}}>
      <div className="container mx-auto px-6 flex justify-between items-center">

        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="w-36 h-auto mr-6" />
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-white hover:text-blue-300">Home</a>
          <a href="#donate" className="text-white hover:text-blue-300">Donate</a>
          <a href="#about" className="text-white hover:text-blue-300">About Us</a>
          <a href="#contact" className="text-white hover:text-blue-300">Contact Us</a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <FundraiserBtn 
          onclick={() => navigate('/registration')}
          className=''/>
          {userInfo ? (
            <div className="flex items-center space-x-4">

              <CgProfile onClick={handleProfile} size={28} className="text-white cursor-pointer hover:text-blue-300" />
              <button onClick={handleLogout}  className="text-white hover:text-blue-300">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-300">Login</Link>   
          )} 
         </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden text-white py-4 px-6 space-y-4 absolute w-full top-full left-0" style={{background:'#55AD9B'}}>
          <a href="#home" className="block text-lg hover:text-blue-300">Home</a>
          <a href="#donate" className="block text-lg hover:text-blue-300">Donate</a>
          <a href="#about" className="block text-lg hover:text-blue-300">About Us</a>
          <a href="#contact" className="block text-lg hover:text-blue-300">Contact Us</a>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Start a Fundraiser
          </button>
          <div className="flex justify-center">
            {userInfo ? (
              <>
                <CgProfile size={28} className="cursor-pointer hover:text-blue-300" />
                <p className='ml-4'>Logout</p>
              </>
            ) : (
              "Login"
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

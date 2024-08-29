import React, { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import FundraiserBtn from './FundraiserBtn';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { userLogout } from '../../redux/slice/authSlice';
import cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import logo from '../../../public/logo.png'

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
          <img src={logo} alt="Logo" className="w-36 h-auto mr-6" />
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-20">
        <Link to="/home" className="text-white hover:text-black text-xl">Home</Link>
        <Link to="/all-posts" className="text-white hover:text-black text-xl">Donate</Link>
        <a href="#about" className="text-white hover:text-black text-xl">About Us</a>
          <a href="#contact" className="text-white hover:text-black text-xl">Contact Us</a>
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
        <div className="md:hidden text-white py-4 px-6 space-y-4 absolute w-full top-full left-0 " style={{background:'#55AD9B'}}>
          <div className='flex flex-col'>
          <Link to="/home" className="text-white hover:text-black text-xl mb-2">Home</Link>
          <Link to="/all-posts" className="text-white hover:text-black text-xl ">Donate</Link>
          </div>
          <a href="#about" className="block text-lg hover:text-blue-300">About Us</a>
          <a href="#contact" className="block text-lg hover:text-blue-300">Contact Us</a>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            onClick={() => navigate('/registration')}
          >
            Start a Fundraiser
          </button>
          <div className="flex justify-center">
            {userInfo ? (
              <>
                <CgProfile size={28} className="cursor-pointer hover:text-blue-300"  onClick={handleProfile}/>
                <p className='ml-4 cursor-pointer' onClick={handleLogout}>Logout</p>
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

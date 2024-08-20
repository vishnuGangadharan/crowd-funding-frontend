import React from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../redux/slice/adminSlice';
import cookies from 'js-cookie';

const SidePanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(adminLogout());
        cookies.remove('jwt');
        googleLogout();
        navigate('/login');
    };

    return (
        
        <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white " >
            <Sidebar aria-label="Sidebar with logo branding example" className='w-56'>
                <div className="flex items-center justify-center py-6">
                    <img src="../logo.png" alt=" logo" className="h-28 w-28" />
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie} className="hover:bg-gray-700 font-semibold">
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/users' icon={HiUser} className="hover:bg-gray-700 font-semibold">
                            Users
                        </Sidebar.Item>
                        
                        <Sidebar.Item as={Link} to='/admin/request' icon={HiInbox} className="hover:bg-gray-700 font-semibold">
                            Campaign Request
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/fundRequest' icon={HiViewBoards} className="hover:bg-gray-700 font-semibold">
                           Fund request <br /> from benificiary 
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/reports' icon={HiShoppingBag} className="hover:bg-gray-700 font-semibold">
                            Reported Posts
                        </Sidebar.Item>
                        {/* <Sidebar.Item href="#" icon={HiArrowSmRight} className="hover:bg-gray-700 ">
                            Sign In
                        </Sidebar.Item> */}
                        <Sidebar.Item onClick={handleLogout} icon={HiTable} className="hover:bg-gray-700 font-semibold text-red-500">
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default SidePanel;

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
        <div className="h-screen bg-gray-800 text-white" >
            <Sidebar aria-label="Sidebar with logo branding example" className='w-52'>
                <div className="flex items-center justify-center py-6">
                    <img src="/favicon.svg" alt="Flowbite logo" className="h-12 w-12" />
                    <span className="ml-3 text-xl font-semibold">Flowbite</span>
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiChartPie} className="hover:bg-gray-700">
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiViewBoards} className="hover:bg-gray-700">
                            Kanban
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/request' icon={HiInbox} className="hover:bg-gray-700">
                            Campaign Request
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/users' icon={HiUser} className="hover:bg-gray-700">
                            Users
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/reports' icon={HiShoppingBag} className="hover:bg-gray-700">
                            Reported Posts
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight} className="hover:bg-gray-700">
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item onClick={handleLogout} icon={HiTable} className="hover:bg-gray-700">
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default SidePanel;

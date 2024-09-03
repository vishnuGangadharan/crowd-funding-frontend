import { Sidebar } from "flowbite-react";
import { HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../redux/slice/adminSlice';
import { useState } from "react";

const SidePanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [active, setActive] = useState<string>('');

    const handleLogout = async () => {
        try {
            
            dispatch(adminLogout());
            localStorage.removeItem('token');
            googleLogout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSelection= (key:string)=>{
        setActive(key)
    }

    return (
        
        <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white " >
            <Sidebar aria-label="Sidebar with logo branding example" className='w-56'>
                <div className="flex items-center justify-center py-6">
                    <img src="../logo.png" alt=" logo" className="h-28 w-28" />
                </div>
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item as={Link} to='/admin/dashboard' icon={HiInbox} className={`${active === 'dashboard'? 'bg-gray-400' :''} hover:bg-gray-700 font-semibold`}
                        onClick={()=> handleSelection('dashboard')}
                        >
                            Dashboard
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/users' icon={HiUser} className={`${active === 'users'? 'bg-gray-400' :''} hover:bg-gray-700 font-semibold`}
                        onClick={()=> handleSelection('users')}
                        >
                            Users
                        </Sidebar.Item>
                        
                        <Sidebar.Item as={Link} to='/admin/request' icon={HiInbox} className={`${active === 'campaignRequest'? 'bg-gray-400' :''} hover:bg-gray-700 font-semibold`}
                        onClick={()=> handleSelection('campaignRequest')}
                        >
                            Campaign Request
                        </Sidebar.Item>
                        <Sidebar.Item as={Link} to='/admin/fundRequest' icon={HiViewBoards} className={`${active === 'fundRequest'? 'bg-gray-400' :''} hover:bg-gray-700 font-semibold`}
                        onClick={()=> handleSelection('fundRequest')}
                        >
                           Fund request <br/> from beneficiary 
                        </Sidebar.Item>
                        
                        <Sidebar.Item as={Link} to='/admin/reports' icon={HiShoppingBag} className={`${active === 'reports'? 'bg-gray-400' :''} hover:bg-gray-700 font-semibold`}
                        onClick={()=> handleSelection('reports')}
                        >
                        Reported Posts
                        </Sidebar.Item>
                       
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

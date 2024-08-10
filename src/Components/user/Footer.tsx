import FundraiserBtn from "./FundraiserBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import footerImg from '../../../public/User/image.png'

const Footer = () => {

  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth); 

  const handleClick = () => {
    if(userInfo){
      
      navigate('/registration')
    }else{
      navigate('/login')
    }
    
  }


  return (
    <div className="w-full h-auto">
      <div className="  p-4 w-full  flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" style={{background:'#55AD9B'}}>
        <div className="flex flex-col md:flex-row md:space-x-10 ml-11 md:ml-[10%] space-y-4 md:space-y-0">
          <ul className="space-y-2">
            <li className="font-bold text-white">HopeSpring</li>
            <li className="text-white">About</li>
            <li className="text-white">Contact</li>
            <li className="text-white">Resources</li>
            <li className="text-white">Phone</li>
          </ul>
          <ul className="space-y-2">
            <li className="font-bold text-white">Address</li>
            <li className="text-white">Helping Hands Pvt. Limited</li>
            <li className="text-white">Kerala</li>
            <li className="text-white">Calicut</li>
            <li className="text-white">Kakkacheri</li>
          </ul>
          <FundraiserBtn className="w-[250px] h-[50px]" onclick={handleClick} />
        </div>
        <img className="w-full md:w-[20%] lg:w-[35%] h-auto" src={footerImg} alt="img" />
      </div>
      <div className="bg-black w-full h-10">
          <p className="flex justify-center text-center text-white">email: hopeSpring@gmial.com</p>
      </div>
    </div>
    
  );
}

export default Footer;

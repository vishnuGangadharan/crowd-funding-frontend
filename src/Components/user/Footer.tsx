import React from "react";
import FundraiserBtn from "./FundraiserBtn";

const Footer = () => {
  return (
    <div className="w-full h-auto">
      <div className=" bg-fuchsia-800 p-4 w-full  flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
          <FundraiserBtn className="w-[250px] h-[50px]" />
        </div>
        <img className="w-full md:w-[20%] lg:w-[35%] h-auto" src="./User/image.png" alt="img" />
      </div>
      <div className="bg-black w-full h-10">
          <p className="flex justify-center text-center text-white">email: hopeSpring@gmial.com</p>
      </div>
    </div>
    
  );
}

export default Footer;

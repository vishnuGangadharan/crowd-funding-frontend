import React from 'react'
import FundraiserBtn from './FundraiserBtn'
import ResponsiveImage from './ImageResponsive'

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-center lg:justify-between p-4 mt-8">
        <div className="lg:w-1/2 p-4 flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">HopeSpring</h2>
            <p className="text-lg mb-4">Raise funds online for medical emergencies and social causes</p>
            <FundraiserBtn className=''/>
          </div>
        </div>
        <ResponsiveImage
          src="./User/hands-together-park.jpg"
          alt="home image"
          className="lg:w-1/2 w-full h-500px lg:mr-10 mr-1 rounded-3xl"
        />
      </div>
  )
}

export default HeroSection

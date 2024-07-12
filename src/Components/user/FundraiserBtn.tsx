import React from 'react'

interface FundraiserBtnProps {
  className: string;
}

const FundraiserBtn : React.FC<FundraiserBtnProps> = ({ className }) => {

  return (
    <button className={`bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 ${className || ""}`}>
            Start a Fundraiser
    </button>
  )
}

export default FundraiserBtn

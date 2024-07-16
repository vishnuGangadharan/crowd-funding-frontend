import React from 'react'

interface FundraiserBtnProps {
  className: string;
  onclick: () => void ;
}

const FundraiserBtn : React.FC<FundraiserBtnProps> = ({ className ,onclick}) => {

  return (
    <button className={`bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 ${className || ""}` }onClick={onclick}>
            Start a Fundraiser
    </button>
  )
}

export default FundraiserBtn

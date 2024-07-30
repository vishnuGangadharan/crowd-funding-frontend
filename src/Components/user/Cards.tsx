import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const Category = () => {

  return (
    
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md rounded-xl w-96">
    <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card"
            className="w-full h-full object-cover"
        />
    </div>
    <div className="p-6">
        <h5 className="mb-2 font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900">
            UI/UX Review Check
        </h5>
        <p className="font-sans text-base font-light leading-relaxed">
            The place is close to Barceloneta Beach and bus stop just 2 min by walk
            and near to "Naviglio" where you can enjoy the main night life in
            Barcelona.
        </p>
    </div>
    <div className="p-6 pt-0">
        <button
            className="font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md hover:shadow-lg focus:opacity-85 active:opacity-85"
            type="button"
        >
            Read More
        </button>
    </div>
</div>
    
  )
}

export default Category

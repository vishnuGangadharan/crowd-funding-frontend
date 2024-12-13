import thought from '../../../public/User/thought.avif';
import t2 from '../../../public/User/t2.avif';
import t3 from '../../../public/User/t3.avif';

import React, { useState } from 'react';

const FlippingCard = () => {
  const [isFlipped, setIsFlipped] = useState<number | null>(null);

  const data = [
    {   
      question: "What is Crowdfunding",
      image: thought,
      text: 'Fundraising is the process of collecting voluntary financial contributions from individuals, businesses, or organizations to support a specific cause, project, or need. It empowers communities to come together and make a positive impact, whether for medical expenses, education, or charitable initiatives, by pooling resources for a greater good.'
    },
    {
      question: "How to be a Fundraiser",
      image: t2,
      text: 'You can easily become a fundraiser by signing up on our platform and submitting the necessary information and documents. After a thorough evaluation of your data, your fundraising campaign will go live, allowing you to start raising funds for your cause.'
    },
    {
      question: "Is there any charges in this platform",
      image: t3,
      text: 'Yes, we charge a 5% fee from the total amount raised through your crowdfunding campaign to ensure the smooth operation of our platform. Rest assured, there are no additional hidden charges, allowing you to focus on your fundraising goals without any unexpected costs.'
    }
  ];

  return (
    <div className="flex grid-cols-1  gap-10">
      {data.map((item, key) => (
        <div
          key={key}
          className="group perspective w-[300px] h-[300px] relative text-center"
        >
          <div
            className={`relative preserve-3d w-80 right-16 h-full duration-1000 text-center ${
              isFlipped === key ? 'rotate-y-180' : ''
            }`}
            onMouseEnter={() => setIsFlipped(key)}
            onMouseLeave={() => setIsFlipped(null)}
          >
            {/* Front Side */}
            <div className="absolute backface-hidden w-full h-full bg-white rounded-lg shadow-lg flex flex-col items-center text-center justify-center">
              <img
                src={item.image}
                alt={item.question}
                className="w-40 h-40 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl text-center text-green-700">{item.question}</h3>
            </div>

            {/* Back Side */}
            <div className="absolute rotate-y-180 backface-hidden w-full h-full bg-yellow-300 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
              <h3 className="text-md text-black mb-2">{item.text}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlippingCard;

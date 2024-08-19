import { getWallet } from '@/api/user';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { walletType } from '@/services/interface/user';

const Wallet: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  
  const [walletData, setWalletData] = React.useState<walletType[]>([]);

  const getUserWallet = async () => {
    try {
      const response = await getWallet(userId as string);
      console.log('wallet', response.data);
      setWalletData(response.data);
    } catch (error) {
      console.log('wallet fetch error', error);
    }
  };

  useEffect(() => {
    getUserWallet();
  }, []);

  const wallet = walletData[0]; 

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-5 mb-5">
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-semibold text-gray-800">{wallet && wallet.userId ? wallet.userId.name : 'N/A'}'s Wallet</h1>
        <h2 className="text-xl font-medium text-green-600">Current Balance: ₹ {wallet ? wallet.balance : 'N/A'} </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left font-medium">No</th>
              <th className="py-3 px-6 text-left font-medium">Type</th>
              <th className="py-3 px-6 text-left font-medium">Amount</th>
              <th className="py-3 px-6 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
           {wallet && wallet.transactions.length > 0 ? wallet.transactions.map((transaction, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      transaction.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="py-3 px-6">{transaction.amount}</td>
                <td className="py-3 px-6 truncate-lines-3">
                  {transaction.description} <br /> {transaction.beneficiary.name}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-3 px-6 text-center">No transactions available</td>
              </tr>
            )}
          </tbody>
          {/* <tfoot>
            <tr className="bg-gray-100">
              <td colSpan={2} className="py-3 px-6 font-semibold text-right">Total Credited:</td>
              <td className="py-3 px-6 font-semibold text-green-700">$</td>
              <td className="py-3 px-6"></td>
            </tr>
            <tr className="bg-gray-100">
              <td colSpan={2} className="py-3 px-6 font-semibold text-right">Total Debited:</td>
              <td className="py-3 px-6 font-semibold text-red-700">$</td>
              <td className="py-3 px-6"></td>
            </tr>
          </tfoot> */}
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Wallet;

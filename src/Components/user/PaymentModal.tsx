import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { loadStripe } from '@stripe/stripe-js';
import { getSessionId, walletPayment } from '@/api/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PaymentData } from '@/services/interface/PostReport';
import { toast } from 'react-toastify';
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaryId: string | undefined;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, beneficiaryId }) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
  
    const [amount, setAmount] = useState<number | string>(''); 
    const [anonymousName, setAnonymousName] = useState<string>('');
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('card');
    const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false); // State to manage payment success


    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };
  
    const userId = userInfo._id;
    const userName = userInfo.name;
  
    const handleDonation = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
      const trimmedAnonymousName = anonymousName.trim();
  
      if (!amount || Number(amount) <= 0) { 
        setError('Amount is required');
        return;
      } else if (Number(amount) < 100) {
        setError('Amount should be greater than 100');
        return;
      } else if (!trimmedAnonymousName) {
        setAnonymousName(userName);
      } else {
        setError('');
      }
  
  
      const PaymentData = {
        amount: Number(amount), 
        anonymousName: trimmedAnonymousName || userName,
        userId: userId,
        beneficiaryId: beneficiaryId,
        method: selectedOption
      };
      if(PaymentData.method === 'wallet'){
        console.log('wallet');
        const response = await walletPayment(PaymentData as PaymentData);
        if(response && response.status === 200){
          toast.success('Payment successful');
          setPaymentSuccessful( paymentSuccessful=>!paymentSuccessful);
          setAmount('');
          setAnonymousName('');
          setSelectedOption('card');
          onClose();
        }
       
        
      }else{
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        const response = await getSessionId(PaymentData as PaymentData)
            onClose();
        

        const sessionId = response?.data;
        await stripe?.redirectToCheckout({
            sessionId: sessionId,
        });
        
      }   

    } catch (error) {
        console.log("stripe", error);

    }
}

useEffect(()=>{
  
},[paymentSuccessful])

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
         <form onSubmit={handleDonation} className="space-y-4">
          <>
            <ModalHeader className="flex flex-col gap-1">Donate</ModalHeader>
            <ModalBody>
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={amount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                      setError('');
                    }}
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div>
                  <label htmlFor="anonymousName" className="block text-sm font-medium text-gray-700">
                    Anonymous Name (optional)
                  </label>
                  <input
                    type="text"
                    id="anonymousName"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={anonymousName}
                    onChange={(e) => setAnonymousName(e.target.value)}
                  />
                </div>
                <div>
        <label>
          <input
            type="radio"
            value="card"
            checked={selectedOption === 'card'}
            onChange={handleOptionChange}
          />
           card Payment
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="wallet"
            checked={selectedOption === 'wallet'}
            onChange={handleOptionChange}
          />
           wallet payment
        </label>
      </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type='submit'>
                Submit
              </Button>
            </ModalFooter>
          </>
              </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;

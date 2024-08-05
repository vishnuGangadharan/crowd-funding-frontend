import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { loadStripe } from '@stripe/stripe-js';
import { getSessionId } from '@/api/user';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { PaymentData } from '@/services/interface/PostReport';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  beneficiaryId: string | undefined;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, beneficiaryId }) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
  
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [anonymousName, setAnonymousName] = useState('');
    const [error, setError] = useState('');
  
    const userId = userInfo._id;
    const userName = userInfo.name;
  
    const handleDonation = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
      const trimmedAnonymousName = anonymousName.trim();
  
      if (!amount) {
        setError('Amount is required');
        return;
      } else if (amount < 100) {
        setError('Amount should be greater than 100');
        return;
      } else if (!trimmedAnonymousName) {
        setAnonymousName(userName);
      } else {
        setError('');
      }
  
  
      const PaymentData = {
        amount: amount,
        anonymousName: trimmedAnonymousName || userName,
        userId: userId,
        beneficiaryId: beneficiaryId,
      };
      
  
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);
        const response = await getSessionId(PaymentData as any)
        
            onClose();
        

        const sessionId = response?.data;
        await stripe?.redirectToCheckout({
            sessionId: sessionId,
        });

    } catch (error) {
        console.log("stripe", error);

    }
}

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

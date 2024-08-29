import { beneficiaryOtpVerify } from "@/api/user";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/Components/ui/input-otp";
import { useState } from "react";
  import { useLocation ,useNavigate } from 'react-router-dom';

  
  const OTPforFundRegister = () => {
    const location = useLocation();
    const { email} = location.state || {};
    const [error, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState('');

    const navigate = useNavigate()
    const handleSubmit = async () => {
      if (otp.length < 4) {
        setError('Please enter a valid OTP.');
        return;
      }
      setError(null);
      console.log("otp",otp, "email",email);
      
      try {
        const response = await beneficiaryOtpVerify(parseInt(otp), email);
        console.log("responseclintotp",response);
        if(response?.status== 200){
          navigate('/media-uploader')
        }

      } catch (error) {
        console.log(error);
        
        
      }

    }

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-300 via-green-500 to-green-700">
        <div className="rounded-lg bg-white w-full max-w-md shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
          <p className="text-center text-gray-600 mb-6">Please enter the OTP sent to your email.</p>
          <div className="flex flex-col items-center">
            <InputOTP maxLength={4} className="w-full" onChange={(otp) => setOtp(otp)}>
              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot index={0} className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg font-semibold" />
                <InputOTPSlot index={1} className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg font-semibold" />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-2 text-gray-400" />
              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot index={2} className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg font-semibold" />
                <InputOTPSlot index={3} className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg font-semibold" />
              </InputOTPGroup>
            </InputOTP>
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button onClick={handleSubmit} className="mt-6 bg-green-500 text-white rounded-lg px-6 py-2 shadow-lg hover:bg-green-600 transition duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default OTPforFundRegister;
  
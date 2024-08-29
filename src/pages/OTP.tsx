import React, { useState, useEffect } from 'react';
import { verifyOtp } from '../api/user';
import { useLocation ,useNavigate } from 'react-router-dom';
import {toast}  from 'react-toastify'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slice/authSlice';


const OTP = () => {


  const dispatch = useDispatch()
  const [otp, setOtp] = useState('');
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [timer, setTimer] = useState<number>(() => {
    const savedTimer = localStorage.getItem('otp-timer');
    return savedTimer ? parseInt(savedTimer, 10) : 60;
  });
  const [error, setError] = useState<string | null>(null);


  const navigate = useNavigate()
  const location = useLocation();
  const { email, name, phone } = location.state || {};

 console.log(name,phone);
 
  
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          localStorage.setItem('otp-timer', newTimer.toString());
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      localStorage.removeItem('otp-timer');
    }
  }, [timer]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
    setError(null); // Clear any previous error messages
  };

  const handleOtpVisibility = () => {
    setIsOtpVisible(!isOtpVisible);
  };

  const handleResendOtp = () => {
    setTimer(60);
    localStorage.setItem('otp-timer', '60');
    // Add logic to resend OTP
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(otp)) {
      setError('OTP must be a 4-digit number');
      return;
    }
    try {
      const response = await verifyOtp(parseInt(otp), email);
      console.log("responseclintotp",response);
      
      if(response){
        toast.success(response.data.message);
        dispatch(setUserData(response.data.data))
       navigate('/home');
      }
      // Add logic to handle successful OTP verification
    } catch (error) {
      setError('Failed to verify OTP');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={isOtpVisible ? 'text' : 'password'}
              value={otp}
              onChange={handleOtpChange}
              maxLength={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter OTP"
            />
            <button
              type="button"
              onClick={handleOtpVisibility}
              className="absolute right-2 top-2 px-2 py-1 bg-gray-200 rounded-lg focus:outline-none"
            >
              {isOtpVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-gray-600">Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OTP;

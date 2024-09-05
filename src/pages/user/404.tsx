import { useNavigate } from 'react-router-dom';
import errorPage from '../../../public/User/errorPage.webp'
const ErrorPage = () => {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/'); // Navigate to the home page
      };
  return (
    <div className='h-screen flex justify-center items-center'>
     <div
  className='rounded-full h-[400px] w-[500px] flex flex-col justify-end items-center bg-cover bg-center p-3'
  style={{
    backgroundImage: `url(${errorPage})`,
    backgroundSize: 'cover',
  }}
>
        <button
          onClick={handleReturnHome}
          className='bg-gradient-to-tr from-[#B249F8] to-[#5e1bac] text-white font-semibold p-2 text-center rounded-full text-small'
        >
          RETURN HOME
        </button>
      </div>
    </div>
  )
}

export default ErrorPage

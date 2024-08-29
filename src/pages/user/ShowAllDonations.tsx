import ShowDonations from '@/Components/user/ShowDonations';
import { useParams } from 'react-router-dom';

const ShowAllDonations = () => {
    const { beneficiaryId } = useParams<{ beneficiaryId: string }>();
    // const userId = '66a8d6a4992c129b769b9d14';

    return (
        <div className='flex justify-center items-center m-9'>
            <div className="w-full max-w-xl"> {/* Increased width to 5xl (80rem or 1280px) */}
             
                <ShowDonations beneficiaryId={beneficiaryId}  widthClass="max-w-2lg" />

            </div>
        </div>
    );
}

export default ShowAllDonations;

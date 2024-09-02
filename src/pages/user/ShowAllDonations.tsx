import ShowDonations from '@/Components/user/ShowDonations';
import { useParams } from 'react-router-dom';

const ShowAllDonations = () => {
    const { beneficiaryId } = useParams<{ beneficiaryId: string }>();


    return (
        <div className='flex justify-center items-center m-9'>
            <div className="w-full max-w-5xl">

                <ShowDonations beneficiaryId={beneficiaryId} widthClass="max-w-2xl" />

            </div>
        </div>
    );
}

export default ShowAllDonations;

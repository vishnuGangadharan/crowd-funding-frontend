import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { getDonations } from '@/api/user';
import { Donation } from '../../services/interface/user';

interface Props {
    beneficiaryId: string | undefined;
}

const ShowDonations: React.FC<Props> = ({ beneficiaryId }) => {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const response = await getDonations(beneficiaryId as string);
            console.log("Responsess:", response.data);
            
            setDonations(response.data); // Assume response is an array of donations
        } catch (error) {
            setError('Failed to fetch donations.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (beneficiaryId) {
            fetchDonations();
        }
    }, [beneficiaryId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        {donations && donations.length > 0 ? (
        <Card className="max-w-sm mt-10">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Donations</h5>
                <p className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer">View all</p>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {donations.map((donation, index) => (
                        <li key={index} className="pb-0 pt-3 sm:pt-4">
                            <div className="flex items-center space-x-4">
                                <div className="shrink-0">
                                    <img className='rounded- w-10 h-10' src={donation.userId.profilePicture} alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{donation.anonymousName }</p>
                                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{donation.email}</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    ${donation.amount}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
        ):(
            <p>No donations yet</p>
        )}
        </div>
    );
};

export default ShowDonations;

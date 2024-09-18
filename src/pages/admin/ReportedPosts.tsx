import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { blockPost, getReport } from '@/api/admin';
import { PostReport } from '@/services/interface/PostReport';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '@/Components/admin/ConfirmationModal';
import { toast } from 'react-toastify';
import { formatDate } from '../../services/functions/Functions';
const ReportedPosts: React.FC = () => {
  const [reports, setReports] = useState<PostReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const response = await getReport();
      if (response && Array.isArray(response.data)) {
        setReports(response.data);
        console.log('Reports:', response.data);
        
      } else {
        setError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [refresh]);

  const blockPosts = async (id: string) => {
    try {
      const response = await blockPost(id);
      if (response.status === true) {
        toast.success(response.message);
      }
      setRefresh(refresh => !refresh);
    } catch (error) {
      console.log('error', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleView = (id: string | undefined) => {
    if (id) {
      navigate(`/admin/postDetails/${id}`);
    }
  };

  return (
    <div className="p-4">
      {reports.length === 0 ? (
       <p className="flex justify-center text-center font-semibold mt-10 text-2xl">
       No report found
     </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          {reports.map((report) => (
            <Card key={report._id} className="mb-4 w-full shadow-md">
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Reported Post</h3>
                    <p className="mb-2"><strong>Reason:</strong> {report.reason || "No reason provided"}</p>
                    <p className="mb-2"><strong>Comment:</strong> {report.comment || "No comment provided"}</p>
                    <p className="mb-2"><strong>Reported count:</strong> {report.count ?? "N/A"}</p>
                    <p className="mb-2"><strong>Blocked By:</strong> {report.userId?.name || "N/A"}</p>
                    <p className="mb-2"><strong>Beneficiary Name :</strong> {report.postId?.name || "N/A"}</p>
                    <p className="mb-2"><strong>Reported Date :</strong> {report.createdAt ? formatDate(new Date(report.createdAt)) : "N/A"}</p>
                  </div>
                  <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-4">
                    <Button color="primary" variant="light" onClick={() => report.postId && handleView(report.postId._id)}>
                      View Post Details
                    </Button>
                    <ConfirmationModal
                     buttonText={report.postId?.blocked ? 'Blocked' : 'Confirm Blocking'}    
                      // buttonText='Confirm Blocking'
                      title='Confirm Blocking'
                      message='Confirm to block this post and refund the money to the dynameter wallet'
                      onConfirm={() => report.postId && report.postId._id && blockPosts(report.postId._id)}
                    />
                    {report.image ? (<div>
                      <img src={report.image} alt="" className='w-24 h-24 object-cover rounded-md' />
                    </div>):('')}
                  </div>
                </div>
                <Divider />
              </CardBody>
            </Card>
          ))}   
        </div>
      )}
    </div>
  );
};

export default ReportedPosts;

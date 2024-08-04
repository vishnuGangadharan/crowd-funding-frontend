import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button, Divider } from "@nextui-org/react";
import { getReport } from '@/api/admin';
import { PostReport } from '@/services/interface/PostReport';

const ReportedPosts: React.FC = () => {
  const [reports, setReports] = useState<PostReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    try {
      const response = await getReport();
      console.log("Response:", response);
      if (response && Array.isArray(response.data)) {
        setReports(response.data);
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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report, index) => (
          <Card key={index} className="mb-4 w-full shadow-md">
            <CardBody>
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Reported Post</h3>
                  <p className="mb-2"><strong>Reason:</strong> {report.reason}</p>
                  <p className="mb-2"><strong>Comment:</strong> {report.comment}</p>
                  <p className="mb-2"><strong>User ID:</strong> {report.userId}</p>
                  <p className="mb-2"><strong>Post ID:</strong> {report.postId}</p>
                </div>
                <div className="flex flex-col space-y-2 mt-4 md:mt-0 md:ml-4">
                  <Button color="primary" variant="light" onClick={() => console.log(`Viewing details for post ${report.postId}`)}>
                    View Post Details
                  </Button>
                  <Button color="danger" variant="light" onClick={() => console.log(`Blocking post ${report.postId}`)}>
                    Block Post
                  </Button>
                </div>
              </div>
              {index < reports.length - 1 && <Divider />}
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default ReportedPosts;

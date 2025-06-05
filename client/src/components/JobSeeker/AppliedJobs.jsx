import { useState, useEffect } from 'react';
import API from '../../api';

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get('/applications/my-applications');
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <div className="grid gap-4">
        {applications.map(application => (
          <div key={application._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{application.jobId.title}</h2>
            <p className="text-gray-600">{application.jobId.company}</p>
            <p className="text-gray-500 mt-2">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-500">Status: {application.status}</p>
          </div>
        ))}
        {applications.length === 0 && (
          <p>You haven't applied to any jobs yet.</p>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;
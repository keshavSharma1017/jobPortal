import { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from 'react-toastify';

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
        console.error('Error fetching applications:', err);
        toast.error('Failed to fetch applications');
        setError('Failed to fetch applications');
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">Loading applications...</div>
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-500 text-center">{error}</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      <div className="grid gap-4">
        {applications.length > 0 ? (
          applications.map(application => (
            <div key={application._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                {application.jobId?.title || 'Job Title Not Available'}
              </h2>
              <p className="text-gray-600 mb-2">
                {application.jobId?.company || 'Company Not Available'}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>Applied on: {new Date(application.createdAt).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className={`px-2 py-1 rounded-full ${
                  application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p className="mb-4">You haven't applied to any jobs yet.</p>
            <a href="/" className="text-blue-500 hover:text-blue-600">
              Browse available jobs
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;
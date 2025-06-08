import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';

function RecruiterDashboard() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await API.get('/jobs/my-jobs');
        setPostedJobs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posted jobs:', err);
        toast.error('Failed to fetch your posted jobs');
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  const handlePostNewJob = () => {
    navigate('/recruiter/post-job');
  };

  const handleViewApplications = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}/applicants`);
  };

  const handleEditJob = (jobId) => {
    navigate(`/recruiter/jobs/${jobId}/edit`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your posted jobs...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <button 
          onClick={handlePostNewJob}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post New Job
        </button>
      </div>
      <div className="grid gap-4">
        {postedJobs.length > 0 ? (
          postedJobs.map(job => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500 mt-2">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 space-x-4">
                <button 
                  onClick={() => handleViewApplications(job._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Applications
                </button>
                <button 
                  onClick={() => handleEditJob(job._id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Edit Job
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>You haven't posted any jobs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
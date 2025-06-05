import { useState, useEffect } from 'react';
import API from '../../api';

function RecruiterDashboard() {
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostedJobs = async () => {
      try {
        const response = await API.get('/jobs/my-jobs');
        setPostedJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posted jobs');
        setLoading(false);
      }
    };

    fetchPostedJobs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <button className="btn">Post New Job</button>
      </div>
      <div className="grid gap-4">
        {postedJobs.map(job => (
          <div key={job._id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 mt-2">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            <div className="mt-4">
              <button className="btn mr-2">View Applications</button>
              <button className="btn">Edit Job</button>
            </div>
          </div>
        ))}
        {postedJobs.length === 0 && (
          <p>You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
}

export default RecruiterDashboard;
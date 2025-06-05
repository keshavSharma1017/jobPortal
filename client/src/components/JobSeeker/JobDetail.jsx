import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api';

function JobDetail() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        <div className="mb-6">
          <p className="text-xl text-gray-600">{job.company}</p>
          <p className="text-gray-500">{job.location} • {job.type}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <button className="btn">Apply Now</button>
      </div>
    </div>
  );
}

export default JobDetail;
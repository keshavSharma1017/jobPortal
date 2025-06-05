import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';
import { toast } from 'react-toastify';

function JobDetail() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const handleApply = async () => {
    if (!user) {
      toast.error('Please login to apply for jobs');
      navigate('/login');
      return;
    }

    try {
      setApplying(true);
      await API.post('/applications', {
        jobId: id,
        resume: 'Sample Resume', // In a real app, this would be a file upload
        coverLetter: 'Sample Cover Letter' // In a real app, this would be user input
      });
      
      toast.success('Application submitted successfully!');
      navigate('/applied-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

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
        <button 
          className={`btn ${applying ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleApply}
          disabled={applying}
        >
          {applying ? 'Submitting...' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}

export default JobDetail;
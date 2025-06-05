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
        console.error('Error fetching job details:', err);
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
      const response = await API.post('/applications', {
        jobId: id,
        resume: 'Sample Resume',
        coverLetter: 'Sample Cover Letter'
      });

      if (response.data) {
        toast.success('Application submitted successfully!');
        navigate('/applied-jobs');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      if (error.response?.status === 401) {
        toast.error('Please login again to continue');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit application');
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">Loading job details...</div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-red-500 text-center">{error}</div>
    </div>
  );

  if (!job) return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">Job not found</div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
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
            {job.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <button 
          className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors ${
            applying ? 'opacity-50 cursor-not-allowed' : ''
          }`}
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
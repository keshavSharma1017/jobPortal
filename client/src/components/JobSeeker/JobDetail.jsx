import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Clock, Building, Send, ArrowLeft } from 'lucide-react';
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
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p>Loading job details...</p>
      </div>
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
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Jobs
      </button>

      <div className="job-detail-card">
        <div className="job-detail-header">
          <div className="job-detail-title-section">
            <h1 className="job-detail-title">{job.title}</h1>
            <div className="job-detail-company">
              <Building size={20} />
              <span>{job.company}</span>
            </div>
          </div>
          
          <div className="job-detail-meta">
            <div className="job-meta-item">
              <MapPin size={18} />
              <span>{job.location}</span>
            </div>
            <div className="job-meta-item">
              <Clock size={18} />
              <span>{job.type}</span>
            </div>
          </div>
        </div>

        <div className="job-detail-content">
          <div className="job-section">
            <h2 className="job-section-title">Job Description</h2>
            <p className="job-description">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="job-section">
              <h2 className="job-section-title">Requirements</h2>
              <ul className="job-requirements">
                {job.requirements.map((req, index) => (
                  <li key={index} className="job-requirement-item">{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="job-detail-actions">
          <button 
            className={`apply-button ${applying ? 'loading' : ''}`}
            onClick={handleApply}
            disabled={applying}
          >
            {applying ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <Send size={20} />
                Apply Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
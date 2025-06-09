import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Clock, Building, Send, ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
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
    <div className="job-detail-container">
      <div className="loading-state">
        <div className="loading-spinner-large"></div>
        <p className="loading-text">Loading job details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="job-detail-container">
      <div className="error-state">
        <div className="error-icon">
          <Briefcase size={48} />
        </div>
        <h2 className="error-title">Job Not Found</h2>
        <p className="error-message">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="back-to-jobs-button-error"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </button>
      </div>
    </div>
  );

  if (!job) return (
    <div className="job-detail-container">
      <div className="error-state">
        <div className="error-icon">
          <Briefcase size={48} />
        </div>
        <h2 className="error-title">Job Not Found</h2>
        <p className="error-message">The job you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')} 
          className="back-to-jobs-button-error"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </button>
      </div>
    </div>
  );

  return (
    <div className="job-detail-container">
      <div className="job-detail-navigation">
        <button
          onClick={() => navigate('/')}
          className="back-to-jobs-button"
        >
          <ArrowLeft size={20} />
          <span>Back to Jobs</span>
        </button>
        
        <div className="breadcrumb">
          <span className="breadcrumb-item">Jobs</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{job.title}</span>
        </div>
      </div>

      <div className="job-detail-card">
        <div className="job-detail-header">
          <div className="job-header-main">
            <div className="company-logo-large">
              <Building size={32} />
            </div>
            
            <div className="job-title-section">
              <h1 className="job-detail-title">{job.title}</h1>
              <div className="job-detail-company">
                <Building size={20} />
                <span>{job.company}</span>
              </div>
            </div>
            
            <div className="job-type-badge">
              {job.type}
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
            <h2 className="job-section-title">About This Role</h2>
            <p className="job-description">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="job-section">
              <h2 className="job-section-title">What We're Looking For</h2>
              <ul className="job-requirements">
                {job.requirements.map((req, index) => (
                  <li key={index} className="job-requirement-item">
                    <CheckCircle size={16} className="requirement-icon" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="job-detail-actions">
          <button 
            className={`apply-button-enhanced ${applying ? 'loading' : ''}`}
            onClick={handleApply}
            disabled={applying}
          >
            {applying ? (
              <>
                <div className="loading-spinner"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Apply for This Position</span>
              </>
            )}
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="secondary-button"
          >
            <ArrowLeft size={18} />
            <span>Browse More Jobs</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
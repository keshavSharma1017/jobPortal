import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPin, Clock, Building, ArrowRight, Briefcase } from 'lucide-react';
import API from '../../api';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to fetch jobs');
        setError('Failed to fetch jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="job-list-container">
        <div className="loading-state">
          <div className="loading-spinner-large"></div>
          <p className="loading-text">Discovering amazing opportunities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-list-container">
        <div className="error-state">
          <div className="error-icon">
            <Briefcase size={48} />
          </div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-list-container">
      <div className="job-list-header">
        <div className="header-content">
          <h1 className="page-title">
            <Briefcase className="title-icon" size={32} />
            Discover Your Next Opportunity
          </h1>
          <p className="page-subtitle">
            Explore {jobs.length} amazing job opportunities waiting for you
          </p>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs && jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job._id} className="job-card-enhanced">
              <div className="job-card-header">
                <div className="company-logo">
                  <Building size={24} />
                </div>
                <div className="job-badge">
                  {job.type}
                </div>
              </div>
              
              <div className="job-card-content">
                <h2 className="job-title-enhanced">{job.title}</h2>
                <p className="job-company-enhanced">{job.company}</p>
                
                <div className="job-meta-enhanced">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                </div>

                {job.description && (
                  <p className="job-preview">
                    {job.description.length > 120 
                      ? `${job.description.substring(0, 120)}...` 
                      : job.description
                    }
                  </p>
                )}
              </div>

              <div className="job-card-footer">
                <Link
                  to={`/jobs/${job._id}`}
                  className="view-details-button"
                >
                  <span>View Details</span>
                  <ArrowRight size={18} className="button-arrow" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <Briefcase size={64} />
            </div>
            <h2 className="empty-title">No Jobs Available</h2>
            <p className="empty-message">
              We're working hard to bring you new opportunities. Check back soon!
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="refresh-button"
            >
              Refresh Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobList;
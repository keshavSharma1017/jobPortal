import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../api';

function JobApplicants() {
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobAndApplications = async () => {
      try {
        const jobResponse = await API.get(`/jobs/${jobId}`);
        setJob(jobResponse.data);

        const applicationsResponse = await API.get(`/applications/job/${jobId}`);
        setApplications(applicationsResponse.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch job applications');
        setLoading(false);
      }
    };

    fetchJobAndApplications();
  }, [jobId]);

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await API.put(`/applications/${applicationId}`, { status });
      
      setApplications(applications.map(app => 
        app._id === applicationId ? { ...app, status } : app
      ));
      
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/recruiter/dashboard')}
          className="text-blue-500 hover:text-blue-600 mb-4"
        >
          ← Back to Dashboard
        </button>
        
        {job && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            <p className="text-gray-600 mb-2">{job.company}</p>
            <p className="text-gray-500">{job.location} • {job.type}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Applications ({applications.length})
          </h2>
        </div>

        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.userId?.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.userId?.email || 'No email'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {application.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(application._id, 'accepted')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application._id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No applications received for this job yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplicants;
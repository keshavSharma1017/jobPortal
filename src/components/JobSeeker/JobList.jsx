import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary mock data
    setJobs([
      {
        id: 1,
        title: 'Software Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        type: 'Full-time'
      },
      {
        id: 2,
        title: 'Product Manager',
        company: 'Innovation Inc',
        location: 'New York',
        type: 'Full-time'
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <div className="mt-2">
              <span className="text-gray-500">{job.location}</span>
              <span className="mx-2">•</span>
              <span className="text-gray-500">{job.type}</span>
            </div>
            <Link
              to={`/jobs/${job.id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
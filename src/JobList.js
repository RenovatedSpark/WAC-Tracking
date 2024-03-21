import React from 'react';
import './App.css';
// Handles job list
function JobList({ jobs, onJobSelect }) {
  return (
    <div className="jobs-container"> {}
      {jobs.map(job => (
        <button key={job} onClick={() => onJobSelect(job)} className="button-hover-effect">
          {job}
        </button>
      ))}
    </div>
  );
}
export default JobList;

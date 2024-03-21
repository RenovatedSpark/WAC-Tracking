import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import JobList from './JobList';
import { mockEmployees } from './mockData/employeesMock';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // Simplified state for tracking the start time of the current job
  const [jobStartTimes, setJobStartTimes] = useState({});
  const [completedJobs, setCompletedJobs] = useState([]);
  const [activeJobs, setActiveJobs] = useState({});

  const handleSelectEmployee = (employeeName) => {
    setSelectedEmployee(mockEmployees.find(e => e.name === employeeName));
  };

  const handleJobSelect = (jobName) => {
    const currentTime = Date.now();
    const employeeName = selectedEmployee && selectedEmployee.name;

    // Ensure there's a selected employee to avoid errors
    if (!employeeName) return;

    const currentJobStartTime = jobStartTimes[employeeName]?.startTime;
    const activeJob = activeJobs[employeeName];

    // Check if the employee is switching jobs
    if (activeJob && jobName !== activeJob) {
      // Calculate duration of the current (soon to be previous) job, if it exists
      const duration = currentJobStartTime ? (currentTime - currentJobStartTime) / 1000 : 0;

      // Finalize the current job before switching to the new one
      if (duration > 0) {
        const completedJob = { employee: employeeName, job: activeJob, duration };
        setCompletedJobs([...completedJobs, completedJob]);
      }

      // Remove the current job from jobStartTimes as it's being completed/switched
      const updatedJobStartTimes = { ...jobStartTimes };
      delete updatedJobStartTimes[employeeName];
      setJobStartTimes(updatedJobStartTimes);
    }

    // Set the new job as the active job and record its start time
    setActiveJobs({ ...activeJobs, [employeeName]: jobName });
    setJobStartTimes({ ...jobStartTimes, [employeeName]: { job: jobName, startTime: currentTime } });
};
const handleExportToJson = () => {
  const fileName = `employee-job-assignments-${new Date().toISOString()}.json`;

  // Combine active and completed jobs for export
  const activeJobsArray = Object.entries(activeJobs).map(([employee, job]) => ({
    employee,
    job,
    status: 'active'
  }));

  const dataToExport = {
    completedJobs,
    activeJobs: activeJobsArray,
  };

  const json = JSON.stringify(dataToExport, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(href);
  link.remove();
};

return (
  <div className="app-container">
    <h2>Employee List</h2> {/* Title for the Employee List */}
    <EmployeeList employees={mockEmployees} onSelectEmployee={handleSelectEmployee} />
    {selectedEmployee && (
      <>
        <h2>Job List</h2> {/* Title for the Job List */}
        <div className="jobs-container">
          <JobList jobs={selectedEmployee.tasks} onJobSelect={handleJobSelect} />
        </div>
      </>
    )}
    <button onClick={handleExportToJson} className="export-button">
      Export Work Log
    </button>
  </div>
);
}

export default App;
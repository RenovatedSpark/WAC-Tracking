import React from 'react';
import './App.css';

function EmployeeList({ employees, onSelectEmployee }) {
  return (
    <div className="employee-container"> {/* Use the adjusted container style */}
      {employees.map(employee => (
        <button key={employee.id} onClick={() => onSelectEmployee(employee.name)} className="button-hover-effect">
          {employee.name}
        </button>
      ))}
    </div>
  );
}

export default EmployeeList;

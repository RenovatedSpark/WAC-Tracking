import React from 'react';
import './App.css';
// Handles the onclick effect for selected employees
function EmployeeList({ employees, onSelectEmployee }) {
  return (
    <div className="employee-container"> {}
      {employees.map(employee => (
        <button key={employee.id} onClick={() => onSelectEmployee(employee.name)} className="button-hover-effect">
          {employee.name}
        </button>
      ))}
    </div>
  );
}

export default EmployeeList;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../api/employeeData';

function EmployeeDetails() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleUpdate = () => {
    navigate(`/employees/update/${employeeId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!employee) {
    return <div>No Employee Found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="bg-dark text-white p-4 rounded">
        <h2 className="text-center mb-4">Employee Details</h2>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card text-white" style={{ position: 'relative' }}>
              <button 
                onClick={handleUpdate}
                className="btn btn-warning"
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '1rem'
                }}
              >
                Update
              </button>
              <div className="card-body">
                <h5 className="card-title p-4 text-warning" style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {employee.name}
                </h5>
                <p className="card-text">
                  <strong>Email:</strong> {employee.contactMethods.email}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {employee.contactMethods.phone}
                </p>
                <p className="card-text">
                  <strong>Address:</strong>
                </p>
                <p className="card-text">{employee.address.line1}</p>
                <p className="card-text">{employee.address.city}</p>
                <p className="card-text">{employee.address.country}</p>
                <p className="card-text">{employee.address.zipCode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;

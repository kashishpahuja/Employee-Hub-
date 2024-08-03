import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../api/employeeData';
import { useNavigate } from 'react-router-dom';
import {toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [totalEmployees,setTotalEmployees] = useState(0);
  const [EmployeesOnPage,setEmployeesOnPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const navigate = useNavigate();

  const listEmployees = async () => {
    try {
      const data = await getEmployees(limit, offset);
      setEmployees(data);
      setTotalEmployees(data.page.total)
      setEmployeesOnPage(data.data.length)
      // console.log(EmployeesOnPage)
    } catch (error) {
      console.error('Error fetching employees', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = async ()=>{
    setOffset(offset - limit)
  }
  useEffect(() => {
    listEmployees();
  }, [limit, offset]);

  const handleDelete = async (employeeId) => {
    try {
      if(EmployeesOnPage===1 && offset>0){
        setOffset(offset - limit)
        await deleteEmployee(employeeToDelete);
      }else{
        await deleteEmployee(employeeToDelete);
        listEmployees()
      }
      // if (EmployeesOnPage > 1 && offset===0) {
      //   await deleteEmployee(employeeToDelete);
      // } else {
      //   setOffset(offset - limit);
      //   await deleteEmployee(employeeToDelete);
      // }
      // listEmployees();
      setShowModal(false);
      toast('Employee Deleted!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      

    } catch (error) {
      console.error('Error deleting employee: ', error);
    }
  };

  const confirmDelete = async (employeeId) =>{
    setEmployeeToDelete(employeeId);
    setShowModal(true);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 bg-custom text-white p-4 rounded">
      <h2 className="text-center mb-4 text-primary">Employee List</h2>
      {totalEmployees === 0 ? (
        <h3 className="py-5 text-center text-primary">No Employees in the System</h3>
      ) : (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="card shadow-lg card-custom">
              <div className="card-body p-4">
                <table className="table table-striped table-custom">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.data.map((emp, index) => (
                      <tr key={emp._id}>
                        <th scope="row">{index + 1 + Math.abs(offset)}</th>
                        <td>{emp.name}</td>
                        <td>{emp.contactMethods.email}</td>
                        <td>
                          <button
                            className="btn btn-light btn-sm me-2 border-primary"
                            onClick={() => navigate(`/employees/${emp._id}`)}
                          >
                            <span className="material-symbols-outlined text-primary">visibility</span>
                          </button>
                          <button
                            className="btn btn-light btn-sm me-2 border-warning"
                            onClick={() => navigate(`/employees/update/${emp._id}`)}
                          >
                            <span className="material-symbols-outlined text-warning">edit</span>
                          </button>
                          <button
                            className="btn btn-light btn-sm border-danger"
                            onClick={() => confirmDelete(emp._id)}
                          >
                            <span className="material-symbols-outlined text-danger">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setOffset(offset - limit)}
                    disabled={offset === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setOffset(offset + limit)}
                    disabled={offset + limit >= totalEmployees}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog text-dark" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title ">Confirm Deletion</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body ">
              <p>Are you sure you want to delete the employee?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                No
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EmployeeList;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee, getEmployees } from '../api/employeeData'; // Import getEmployees
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateEmployee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        address: {
            line1: '',
            city: '',
            country: '',
            zipCode: ''
        },
        contactMethods: {
            email: '',
            phone: ''
        }
    });
    const [employees, setEmployees] = useState([]); // State to store all employees
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await getEmployeeById(employeeId);
                delete data._id;
                setEmployee(data);
                console.log("Fetching data to be updated: ", data);
            } catch (error) {
                console.error("Error fetching data to update: ", error);
            } finally {
                setLoading(false);
            }
        };
        
        const fetchEmployees = async () => {
            try {
                const data = await getEmployees();
                setEmployees(data.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployee();
        fetchEmployees();
    }, [employeeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.');

        if (subField) {
            setEmployee(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [subField]: value
                }
            }));
        } else {
            setEmployee(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const isEmailValid = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!isEmailValid(employee.contactMethods.email)) {
            toast.error('Invalid email address format. Please enter a valid email.', {
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
            return;
        }

        const emailExists = employees.find(emp => emp._id !== employeeId && emp.contactMethods.email === employee.contactMethods.email);
        if (emailExists) {
            toast.error('Email already in use', {
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
            return;
        }

        try {
            console.log("Updating employee with data: ", JSON.stringify(employee, null, 2));
            await updateEmployee(employeeId, employee);
            toast('Employee Updated!', {
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
            navigate('/');
        } catch (error) {
            console.error("Error updating data: ", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4 text-primary">Update Employee</h3>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg bg-dark text-white p-4 rounded">
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        name="name"
                                        value={employee.name}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="contactMethods.email"
                                        value={employee.contactMethods.email}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        name="contactMethods.phone"
                                        value={employee.contactMethods.phone}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address Line 1</label>
                                    <input
                                        type="text"
                                        name="address.line1"
                                        value={employee.address.line1}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input
                                        type="text"
                                        name="address.city"
                                        value={employee.address.city}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <input
                                        type="text"
                                        name="address.country"
                                        value={employee.address.country}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Zip Code</label>
                                    <input
                                        type="text"
                                        name="address.zipCode"
                                        value={employee.address.zipCode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateEmployee;

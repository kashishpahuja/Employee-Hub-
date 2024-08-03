import React, { useState, useEffect } from 'react';
import { getEmployees, addEmployee } from '../api/employeeData';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddEmployee() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zipCode: '',
  });
  const [contactMethods, setContactMethods] = useState({
    email: '',
    phone: '',
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (['email', 'phone'].includes(name)) {
      setContactMethods((prevContacts) => ({ ...prevContacts, [name]: value }));
    } else {
      setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    }
  };

  const isEmailValid = (email) =>{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!isEmailValid(contactMethods.email)){
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

    const employeeData = {
      name,
      address: {
        line1: address.line1,
        city: address.city,
        country: address.country,
        zipCode: address.zipCode,
      },
      contactMethods: {
        email: contactMethods.email,
        phone: contactMethods.phone,
      },
    };

    const emailExists = employees.find(emp => emp.contactMethods.email === contactMethods.email);
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
      await addEmployee(employeeData);
      toast('New Employee Added!', {
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
      // Resetting the form
      setName('');
      setContactMethods({ email: '', phone: '' });
      setAddress({ line1: '', city: '', country: '', zipCode: '' });
    } catch (error) {
      console.error('Error adding employee: ', error);
      alert('Failed to add employee. Please try again');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Add Employee</h3>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg bg-dark text-white p-4 rounded">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={name}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={contactMethods.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text" 
                    name="phone"
                    value={contactMethods.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="line1"
                    value={address.line1}
                    placeholder="Line 1"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Zip Code</label>
                  <input
                    type="text" 
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
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

export default AddEmployee;

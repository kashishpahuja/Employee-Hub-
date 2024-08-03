import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeList from './pages/EmployeeList.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import Header from './components/Header.jsx';
import EmployeeDetails from './pages/EmployeeDetails.jsx';
import UpdateEmployee from './pages/UpdateEmployee.jsx';

function App() {
  return (
    <div className='app-background'>
    <ToastContainer/>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<EmployeeList/>}></Route>
        <Route path='/add' element={<AddEmployee/>}></Route>
        <Route path='/employees/:employeeId' element={<EmployeeDetails/>}></Route>
        <Route path='/employees/update/:employeeId' element={<UpdateEmployee/>}></Route>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

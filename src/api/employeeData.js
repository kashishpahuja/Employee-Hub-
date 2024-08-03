import axios from './axios.js';

// fetch employees

export const getEmployees=async(limit=10,offset=0)=>{
    try{
        const response = await axios.get('/employees',{
        params:{ limit, offset}
    });
        console.log('fetched employees: ',response.data)
        return response.data;
    }catch(error){
        throw error
    }
}

// adding an employee

export const addEmployee = async(employeeData)=>{
    try{
    console.log("sending this employee data to backend ",employeeData)
    const response = await axios.post('/employees', employeeData);
    console.log("data posted ",response.data)
    return response.data;
    }catch(error){
        console.error('error adding employee:',error);
        throw error;
    }
}

// delete an Employee

export const deleteEmployee = async (employeeId)=>{
    try{
        const response = await axios.delete(`/employees/${employeeId}`,{
            data: {}
        });
        console.log('employee deleted: ',response.data);
        return response.data;
    }catch(error){
        throw error;
    }
}

// fetch employee by Id

export const getEmployeeById = async (employeeId) =>{
    try{
        // console.log("employee id: ",employeeId);
        const response = await axios.get(`/employees/${employeeId}`)
        return response.data;
    }catch(error){
        throw error;
    }
}

// update an employee

export const updateEmployee = async (employeeId,employeeData) =>{
    console.log({employeeData})
    // delete employeeData._id;
    try{
        const response = await axios.patch(`/employees/${employeeId}`,employeeData)
        return response.data;
        console.log("data updated",response.data)


    }catch(error){
        throw error
    }
}
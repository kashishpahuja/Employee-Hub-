import axios from 'axios';

const BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api/';
const PROJECT_ID = '66aa5b15f6fe56d219aaadf7'; 
const ENVIRONMENT_ID = '66aa5b15f6fe56d219aaadf8'; 

const apiClient = axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'projectId': PROJECT_ID,
        'environmentId': ENVIRONMENT_ID
    }
});


export default apiClient;
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.VUE_APP_AUTH_KEY
    }
})

// console.log(process.env); // Test during testing
// console.log(process.env.VUE_APP_AUTH_KEY); 
export default authApi
import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-407f1-default-rtdb.firebaseio.com'
})

console.log(process.env.NODE_ENV); // Test during testing
export default journalApi
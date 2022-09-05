import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-407f1-default-rtdb.firebaseio.com'
})

export default journalApi
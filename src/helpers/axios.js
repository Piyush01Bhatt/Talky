import axios from 'axios'

const instance = axios.create({
    //baseURL: 'http://0.0.0.0:8001',
    baseURL: 'https://talky-backend.herokuapp.com'
})

export default instance;
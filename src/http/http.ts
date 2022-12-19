import axios from 'axios'

const http = axios.create({
    timeout: 2000
})

http.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})


http.interceptors.response.use(res => {
    return res.data
}, err => {
    return Promise.reject(err)
})

export default http
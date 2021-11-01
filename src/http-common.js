import axios from 'axios';

export default axios.create({
    baseURL: "http://localhhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
})
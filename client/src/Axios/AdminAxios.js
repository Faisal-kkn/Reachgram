// import axios from 'axios'

// const baseurl = 'http://localhost:5000'
// const instance = axios.create({baseURL: baseurl})

import axios from "axios";
const baseURL = "http://localhost:5000";

const defaultOptions = {
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};

// Create  user instance
let AdminInstance = axios.create(defaultOptions);

// Set the AUTH token for any request
AdminInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("adminToken");
    console.log(token, "verifyyyyyysyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
    config.headers.accesstoken = token;
    return config;
});

export default AdminInstance;
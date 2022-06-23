
import axios from 'axios';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem("access_token");
// For GET requests
axios.interceptors.request.use(
    (req) => {
        // Add configurations here
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// For POST requests
axios.interceptors.response.use(
    (res) => {
     
        if (localStorage.getItem("access_token") == null && res.data.user != undefined) {
            axios.defaults.headers.common['x-access-token'] = res.data.user.token;
        }
       
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axios;
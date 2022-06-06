import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/';

const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.success && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data.data;
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data.success && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
    }
    return response.data.data;
}

const logout = async () => {

    localStorage.removeItem('user');
    // logouta istek atılacak ama token lazım sonra bak

    // const response = await axios.post(API_URL + 'logout');
    // if (response.data.success && response.data.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data.data));
    // }
    // return response.data.data;
}

const authService = {
    register,logout,login
}

export default authService;
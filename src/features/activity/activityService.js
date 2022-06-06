import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/';

const findUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL + 'findUser', config)
    if (response.data && response.data.success) {
        return response.data.data;
    }
    return response.data.data;
}

const userActivity = async (postDataForm,token) => {

    const config = {
        method: "POST",
        baseURL: API_URL,
        data:postDataForm,
        headers: {
            'Authorization' : 'Bearer '+ token
        }
    }

    const response = await axios('userActivity',config);
    if (response.data && response.data.success) {
        return response.data.data;
    }
    return response.data.data;
}

const activityService = {
    findUser,userActivity
}


export default activityService;
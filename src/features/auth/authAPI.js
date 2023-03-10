import axios from "axios"

const API_URL_LOGIN = process.env.REACT_APP_API_SERVER+'/admin/login'

const login = async (userData) =>{
    const response = await axios.post(API_URL_LOGIN, userData)
    return response.data
}

const authAPI = {
    login
}

export default authAPI
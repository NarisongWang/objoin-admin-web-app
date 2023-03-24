import axios from "axios"
import { getConfig } from "../../utils/utils"

const API_URL_EMP_LIST = process.env.REACT_APP_API_SERVER+'/mssql/employees/'
const API_URL_EMP_COUNT =  process.env.REACT_APP_API_SERVER+'/mssql/countemployees'
const API_URL_EMP_ACTIVATE = process.env.REACT_APP_API_SERVER+'/admin/activateuser'

const getEmployees = async(queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_EMP_LIST, queryParams, config)
    return response.data
}

const getTotalCount = async (queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_EMP_COUNT, queryParams, config)
    return response.data
}

const getEmployee = async(employeeId, token) =>{
    const config = getConfig(token)
    const response = await axios.get(API_URL_EMP_LIST + employeeId, config)
    return response.data
}

const activateAccount = async(formData, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_EMP_ACTIVATE, formData, config)
    return response.data
}



const employeeAPI = {
    getEmployees,
    getTotalCount,
    getEmployee,
    activateAccount
}

export default employeeAPI
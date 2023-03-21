import axios from "axios"
import { getConfig } from "../../utils/utils"

const API_URL_LIST =  process.env.REACT_APP_API_SERVER+'/admin/installationorders/'
const API_URL_COUNT = process.env.REACT_APP_API_SERVER+'/admin/countorders'
const API_URL_SETUP = process.env.REACT_APP_API_SERVER+'/admin/setuporder'
const API_URL_EDIT = process.env.REACT_APP_API_SERVER+'/admin/editorder'
const API_URL_CLOSE = process.env.REACT_APP_API_SERVER+'/admin/closeorder'
const API_URL_DELETE = process.env.REACT_APP_API_SERVER+'/admin/deleteorder'


// queryParams = { firstPageIndex, pageSize, searchText }
const getInstallationOrders = async (queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_LIST, queryParams, config)
    return response.data
}

const getTotalCount = async (queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_COUNT, queryParams, config)
    return response.data
}

const getInstallationOrder = async(installationOrderId, token) =>{
    const config = getConfig(token)
    const response = await axios.get(API_URL_LIST + installationOrderId, config)
    return response.data
}

const closeInstallationOrder = async(installationOrderId, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_CLOSE, installationOrderId, config)
    return response.data
}

const deleteInstallationOrder = async(installationOrderId, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_DELETE, installationOrderId, config)
    return response.data
}

const setupInstallationOrder = async(installationOrder, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_SETUP, installationOrder, config)
    return response.data
}


const editInstallationOrder = async(installationOrder, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_EDIT, installationOrder, config)
    return response.data
}

const installationOrderAPI = {
    getInstallationOrders,
    getTotalCount,
    getInstallationOrder,
    closeInstallationOrder,
    deleteInstallationOrder,
    setupInstallationOrder,
    editInstallationOrder,
}

export default installationOrderAPI
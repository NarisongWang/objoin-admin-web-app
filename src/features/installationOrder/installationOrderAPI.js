import axios from "axios"

const API_URL_LIST =  process.env.REACT_APP_API_SERVER+'/admin/installationorders/'
const API_URL_COUNT = process.env.REACT_APP_API_SERVER+'/admin/countorders'


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

const getConfig = (token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return config
}

const installationOrderAPI = {
    getInstallationOrders,
    getTotalCount
}

export default installationOrderAPI
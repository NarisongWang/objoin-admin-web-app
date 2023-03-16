import axios from "axios"
import { getConfig } from "../../utils/utils"

const API_URL_LIST = process.env.REACT_APP_API_SERVER+'/mssql/salesorders/'
const API_URL_COUNT = process.env.REACT_APP_API_SERVER+'/mssql/countsalesorders'
const API_URL_CREATE = process.env.REACT_APP_API_SERVER+'/admin/createinstallationorders'

// queryParams = { firstPageIndex, pageSize, searchText }
const getSalesOrders = async (queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_LIST, queryParams, config)
    return response.data
}

const getTotalCount = async (queryParams, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_COUNT, queryParams, config)
    return response.data
}

const salesOrderAPI = {
    getSalesOrders,
    getTotalCount
}

export default salesOrderAPI
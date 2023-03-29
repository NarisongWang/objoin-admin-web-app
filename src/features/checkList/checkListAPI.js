import axios from "axios"
import { getConfig } from "../../utils/utils"

const API_URL_CHECKLIST = process.env.REACT_APP_API_SERVER+'/admin/getchecklist'
const API_URL_CHECKLIST_UPDATE = process.env.REACT_APP_API_SERVER+'/admin/updatechecklist'

const getCheckList = async(token) =>{
    const config = getConfig(token)
    const response = await axios.get(API_URL_CHECKLIST, config)
    return response.data 
}

const updateCheckList = async(checkList, token) =>{
    const config = getConfig(token)
    const response = await axios.post(API_URL_CHECKLIST_UPDATE, { checkList }, config)
    return response.data 
}

const checkListAPI = {
    getCheckList,
    updateCheckList
}

export default checkListAPI
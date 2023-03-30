export const parseDate = (strDate) =>{
    var strSplitDate = String(strDate).split(' ')
    var date = new Date(strSplitDate[0])
    var dd = date.getDate()
    var mm = date.getMonth() + 1 //January is 0!

    var yyyy = date.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    date =  dd + "-" + mm + "-" + yyyy
    return date.toString()
}

export const parseTime = (strDate) =>{
    var strSplitDate = String(strDate).split(' ')
    var time = new Date(strSplitDate[0])
    var hh = time.getHours()
    var mm = time.getMinutes()

    time =  `${hh}:${mm>9?mm:'0'+mm}`
    return time.toString()
}

export const getConfig = (token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    return config
}

export const initFiles = (installationOrderNumber, files) => {
    const result = files.reduce(
        (accumulator, file, index) => {
            const lastIndex = file.lastIndexOf('\\')+1
            const file_path = file.substring(0, lastIndex)
            const file_dir = file.substring(file.indexOf(installationOrderNumber),lastIndex-1)
            const file_name = file.substring(lastIndex, file.length)

            const dirIndex = accumulator.findIndex((item) => item.file_dir === file_dir);
            if(dirIndex === -1) {
                let dirObject = { file_path: file_path, file_dir: file_dir, files: [{id: index, file_name:file_name, isChecked:false}] }
                accumulator.push(dirObject);
            } else {
                accumulator[dirIndex].files.push({id: index, file_name:file_name, isChecked:false})
            }
            return accumulator
        }, []
    )
    return result
}
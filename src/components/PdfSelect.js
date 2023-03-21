import React from 'react'
import styles from './PdfSelect.module.css'

const PdfSelect = ({ file, filePath, handleCheckBoxChange}) => {
    const url = filePath.replaceAll('\\','/').replace('objoin-sql/public/SalesOrders/','//192.168.2.5:3088/')+file.file_name
    return (
        <div className={styles.horizontal}>
            <input className={styles.input} type="checkbox" checked={file.isChecked} onChange={(e)=>{handleCheckBoxChange(file, e.target.checked)}}></input>
            <a href={url} target="_blank" rel="noreferrer" className={file.isChecked?styles.checked:styles.unchecked}>{file.file_name}</a>
        </div>
    )
}

export default PdfSelect
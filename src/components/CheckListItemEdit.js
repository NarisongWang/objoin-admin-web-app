import React,{ useState, useEffect } from 'react'
import styles from './CheckListItemEdit.module.css'

const CheckListItemEdit = ({ index, title, handleAdd, handleEdit, handleDelete }) => {
    const original = title
    const [ editable, setEditable ] = useState(false)
    const [ inputValue, setInputValue ] = useState(title)
    useEffect(()=>{
        setInputValue(title)
    },[title])

    const editTitle = () => {
        setEditable(true)
    }

    const addItem = () =>{
        handleAdd(index)
    }

    const deleteItem = () => {
        handleDelete(index)
    }

    const update = () =>{
        handleEdit(index, inputValue)
        setEditable(false)
    }

    const cancel = () =>{
        setEditable(false)
        setInputValue(original)
    }

    return (
        <div className={styles.container}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div className={styles.index}>{index}</div> 
                <input type='text' className={styles.input} size={inputValue.length} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} disabled={!editable}></input>
            </div>
            {title === 'Other notes'?null:
            editable?
                <div className={styles.buttons}>
                    <span className={styles.update} onClick={update}>Update✓</span>
                    <span className={styles.cancel} onClick={cancel}>Cancel✕</span>
                </div>:
                <div className={styles.buttons2}>
                    <span className={styles.link} onClick={addItem}>Add</span>
                    <span className={styles.link} onClick={editTitle}>Edit</span>
                    <span className={styles.link} onClick={deleteItem}>Delete</span>
                </div>}
        </div>
    )
}

export default CheckListItemEdit
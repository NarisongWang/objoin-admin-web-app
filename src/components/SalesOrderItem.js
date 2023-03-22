import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { parseDate } from '../utils/utils'
import styles from './SalesOrderItem.module.css'

const SalesOrderItem = ({ index, salesOrder, select, setSelect, currentPage, searchText  }) => {
    const [ checked, setChecked ] = useState(false) 
    const checkSelection = () => {
        const newChecked = !checked;
        let newSelect = [...select];
        if (newChecked) {
            newSelect.push(index);
        } else {
            var i = newSelect.indexOf(index);
            if (i !== -1) {
                newSelect.splice(i, 1);
            }
        }
        setSelect(newSelect);
        setChecked(newChecked);
    }
    return (
        <div className={styles.orderItems}>
            {salesOrder.loaded?
                (<input type='checkbox' checked={true} disabled></input>):
                (<input type='checkbox' checked={checked} onChange={checkSelection}></input>)
            }
            <Link to={`/sales-order/${salesOrder.ID}/${currentPage}/${searchText}`} className='link'>
                {salesOrder.installationOrderNumber}
            </Link> 
            <div>{parseDate(salesOrder.dueDate)}</div>
            <div>{salesOrder.customer}</div>
            <div>{salesOrder.shipName}</div>
            <div>{salesOrder.shipAddress}</div>
            {salesOrder.loaded?
            (<div className={styles.loaded}>Loaded</div>):
            (<div className={styles.notLoaded}>Not Loaded</div>)}
        </div>
    )
}

export default SalesOrderItem
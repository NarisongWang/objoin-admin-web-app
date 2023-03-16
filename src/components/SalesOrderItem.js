import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { parseDate } from '../utils/utils'
import styles from './SalesOrderItem.module.css'

const SalesOrderItem = ({ index, salesOrder, select, setSelect }) => {


    return (
        <div className={styles.orderItems}>
            {salesOrder.loaded?
                (<input type='checkbox' checked={true} disabled></input>):
                (<input type='checkbox' checked={false}></input>)
            }
            <Link to={`/load-installation-orders/${salesOrder.ID}`} className='link'>
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

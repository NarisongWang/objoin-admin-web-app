import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './InstallationOrderItem.module.css'
import { parseDate } from '../utils/utils'

const InstallationOrderItem = ({ installationOrder, currentPage, searchText }) => {
    const { dictionary } = useSelector(
        (state) => state.auth
    )
    const statusDesc = dictionary.workStatus?
        dictionary.workStatus[installationOrder.workStatus].statusDesc:''
    const date = parseDate(installationOrder.dueDate)
    return (
        <div className={styles.orderItems}>
            <div>
                <Link to={`/installation-order/${installationOrder._id}/${currentPage}/${searchText}`} className='link'>
                    {installationOrder.installationOrderNumber}
                </Link>
            </div>
            <div className={`status status-${installationOrder.workStatus}`}>{statusDesc}</div>
            <div>{installationOrder.customer}</div>
            <div>{installationOrder.shipName}</div>
            <div>{installationOrder.shipAddress}</div>
            <div>{date}</div>
            {installationOrder.workStatus===0? (
                <Link to={`/installation-order-setup/${installationOrder._id}/setup/${currentPage}/${searchText}`} className='btn btn-sm'>
                    Set Up
                </Link>
            ):
            installationOrder.workStatus===4||installationOrder.workStatus===5?(
                <Link to={`/installation-order-report/${installationOrder._id}`} target="_blank" rel="noreferrer" className='btn btn-sm'>
                    Installation Report
                </Link>
            ):
            (<button className='btn btn-grey' disabled>
            Installation Report
            </button>)}
        </div>
    )
}

export default InstallationOrderItem
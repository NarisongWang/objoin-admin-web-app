import React from 'react'
import styles from './InstallationOrderItem.module.css'

const InstallationOrderItem = ({ installationOrder }) => {
    return (
        <div className={styles.orderItems}>
            <div>{installationOrder.installationOrderNumber}</div>
            <div></div>
            <div>{installationOrder.customer}</div>
            <div>{installationOrder.shipName}</div>
            <div>{installationOrder.shipAddress}</div>
            <div></div>
            <div></div>
        </div>
    )
}

export default InstallationOrderItem
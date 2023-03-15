import React from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'

const InstallationOrderDetail = () => {
    const { installationOrderId, paramPage, paramText } = useParams()

    return (
        <>
            <BackButton url={`/installation-orders/${paramPage}/${paramText?paramText:''}`}></BackButton>
            <div>
                {installationOrderId}
            </div>
        </>
    )
}

export default InstallationOrderDetail

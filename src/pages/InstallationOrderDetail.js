import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getInstallationOrder, closeInstallationOrder, deleteInstallationOrder } from '../features/installationOrder/installationOrderSlice'
import { parseDate } from '../utils/utils'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import styles from './InstallationOrderDetail.module.css'

const InstallationOrderDetail = () => {
    const { installationOrderId, paramPage, paramText } = useParams()

    const { installationOrder, isLoading, error } = useSelector(
        (state) => state.installationOrder
    )
    const { dictionary } = useSelector(
        (state) => state.auth
    )

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const workStatus = installationOrder.workStatus||installationOrder.workStatus===0?dictionary.workStatus[installationOrder.workStatus].statusDesc:''

    useEffect( () => {
        dispatch(getInstallationOrder(installationOrderId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(error!==''){
            toast.error(error)
        }
    },[error])

    const closeOrder = () => {
        if (window.confirm("Are you sure you want to close this order?")) {
            dispatch(closeInstallationOrder({installationOrderId}))
            .unwrap().then(()=>{
                navigate(`/installation-orders/${paramPage}/${paramText?paramText:''}`)
                toast.success('Installation Order Closed!')
            }).catch(toast.error)
        } else {}
    }

    const deleteOrder = () =>{
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteInstallationOrder({installationOrderId}))
            .unwrap().then(()=>{
                navigate(`/installation-orders/${paramPage}/${paramText?paramText:''}`)
                toast.success('Installation Order Deleted!')
            }).catch(toast.error)
        } else {}
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className={styles.orderDetail}>
            <BackButton url={`/installation-orders/${paramPage}/${paramText?paramText:''}`}></BackButton>
            <h2>
                Installation Order Number: 
                <span className={`status status-${installationOrder.workStatus}`}>
                    {workStatus}
                </span>
            </h2>
            <li>{installationOrder.installationOrderNumber} </li>
            <h3>Customer:</h3> <li>{installationOrder.customer} </li>
            <h3>Ship Name:</h3> <li>{installationOrder.shipName} </li>
            <h3>Ship Address:</h3><li>{installationOrder.shipAddress}</li>
            <h3>Entry Date:</h3><li>{parseDate(installationOrder.entryDate)} </li>
            <h3>Due Date:</h3><li>{parseDate(installationOrder.dueDate)} </li>
            <h3>Installation Items: </h3> {installationOrder.checkItems?installationOrder.checkItems.map((checkItem,index)=>{
                return <li key={index}>{checkItem}</li>
            }):""}
            <h3>Deliverers: </h3> {installationOrder.deliverers?installationOrder.deliverers.map((user,index)=>{
                return <li key={index}>{user.fullName}</li>
            }):""}
            <h3>Installers: </h3> {installationOrder.installers?installationOrder.installers.map((user,index)=>{
                return <li key={index}>{user.fullName}</li>
            }):""}
            <h3>PDF Files:</h3> {installationOrder.files?installationOrder.files.map((file,index)=>{
                return <li key={index}><a href={"http://192.168.2.5:3088/"+installationOrder.localFilePath.substring(32)+file} className="link" target="_blank" rel="noreferrer">{file}</a></li>
            }):""}
            <h3>Photos:</h3> 
            {installationOrder.photos1?installationOrder.photos1.map((photo,index)=>{
                return <li key={index}><a href={"/display-photo/"+photo.replaceAll('/','-')} className="link" target="_blank" rel="noreferrer">{photo}</a></li>
            }):""}
            {installationOrder.photos2?installationOrder.photos2.map((photo,index)=>{
                return <li key={index}><a href={"/display-photo/"+photo.replaceAll('/','-')} className="link" target="_blank" rel="noreferrer">{photo}</a></li>
            }):""}

            <div>&nbsp;</div>
            {(installationOrder.workStatus === 1||installationOrder.workStatus === 2||installationOrder.workStatus === 3) && (
                <Link to={`/edit-installation-order/${installationOrder._id}`} className='btn btn-block'> Edit Installation Order</Link>
            )}
             {(installationOrder.workStatus === 0||installationOrder.workStatus ===1) &&(
                <button onClick={()=>{deleteOrder()}} className='btn btn-block btn-danger'> Delete Installation Order</button>
            )}
            {(installationOrder.workStatus === 4||installationOrder.workStatus === 5) &&(
                <Link to={`/installation-report/${installationOrder._id}`} className='btn btn-block'> Open Installation Report</Link>
            )}
            {(installationOrder.workStatus === 4 && installationOrder.workStatus !== 5) && (
                <button onClick={()=>{closeOrder()}} className='btn btn-block btn-danger'> Close Installation Order</button>
            )}
        </div>
    )
}

export default InstallationOrderDetail
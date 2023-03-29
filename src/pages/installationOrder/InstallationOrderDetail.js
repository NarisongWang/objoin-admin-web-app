import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getInstallationOrder } from '../../features/installationOrder/installationOrderSlice'
import { parseDate } from '../../utils/utils'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import styles from './InstallationOrderDetail.module.css'

const InstallationOrderDetail = () => {
    const { installationOrderId, paramPage, paramText } = useParams()

    const { installationOrder, isLoading, error } = useSelector(
        (state) => state.installationOrder
    )
    const { dictionary } = useSelector(
        (state) => state.auth
    )

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

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className={styles.orderDetail}>
            <h2>
                <BackButton url={`/installation-orders/${paramPage}/${paramText?paramText:''}`}></BackButton>
                Installation Order Details 
                <span className={`status status-${installationOrder.workStatus}`}>
                    {workStatus}
                </span>
            </h2>
            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='installationOrderNumber'>Installation Order Number</label>
                    <input type='text' className='form-control' value={installationOrder.installationOrderNumber} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='clientName'>Customer</label>
                    <input type='text' className='form-control' value={installationOrder.customer} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='deliveryName'>Ship Name</label>
                    <input type='text' className='form-control' value={installationOrder.shipName} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='deliveryAddress'>Ship Address</label>
                    <input type='text' className='form-control' value={installationOrder.shipAddress} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='entyrDate'>Entry Date</label>
                    <input type='text' className='form-control' value={parseDate(installationOrder.entryDate)} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='dueDate'>Due Date</label>
                    <input type='text' className='form-control' value={parseDate(installationOrder.dueDate)} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='checkItems'>Installtion Items</label>
                    {installationOrder.checkItems&&installationOrder.checkItems.length!==0?
                    <textarea type='text' style={{height:`${installationOrder.checkItems.length*20+25}px`, resize: 'none'}} value={installationOrder.checkItems.join('\n')} disabled></textarea>
                    :<textarea type='text' style={{height:'45px', resize: 'none', color: 'grey', fontStyle:'italic'}} className='form-control' value='* No installation items found' disabled></textarea>}
                </div>
                <div className='form-group'>
                    <label htmlFor='deliverers'>Deliverer</label>
                    {installationOrder.deliverers&&installationOrder.deliverers.length>0?<input type='text' className='form-control' value={installationOrder.deliverers.map(user=>user.fullName)} disabled></input>
                    :<input type='text' style={{height:'45px', resize: 'none', color: 'grey', fontStyle:'italic'}} value="* Installation Order hasn't been setup." disabled></input>}
                </div>
                <div className='form-group'>
                    <label htmlFor='installers'>Installer</label>
                    {installationOrder.installers&&installationOrder.installers.length>0?<input type='text' className='form-control' value={installationOrder.installers.map(user=>user.fullName)} disabled></input>
                    :<input type='text' style={{height:'45px', resize: 'none', color: 'grey', fontStyle:'italic'}} value="* Installation Order hasn't been setup." disabled></input>}
                </div>
                <div className='form-group'>
                    <label htmlFor='files'>PDF Files <span style={{color:'blue', fontWeight:'bold'}}>Uploaded to Cloud</span></label>
                    {installationOrder.files?installationOrder.files.map((file,index)=>{
                        return <li key={index}><a href={"http://192.168.2.5:3088/"+installationOrder.localFilePath.substring(32)+file} className="link" target="_blank" rel="noreferrer">{file}</a></li>
                    }):""}
                </div>
                <div className='form-group'>
                    <label htmlFor='photos'>Photos <span style={{color:'blue', fontWeight:'bold'}}>Uploaded to Cloud</span></label>
                    {installationOrder.photos1?installationOrder.photos1.map((photo,index)=>{
                        return <li key={index}><a href={"/display-photo/"+photo.replaceAll('/','-')} className="link" target="_blank" rel="noreferrer">{photo}</a></li>
                    }):""}
                    {installationOrder.photos2?installationOrder.photos2.map((photo,index)=>{
                        return <li key={index}><a href={"/display-photo/"+photo.replaceAll('/','-')} className="link" target="_blank" rel="noreferrer">{photo}</a></li>
                    }):""}
                </div>
            </section>
        </div>
    )
}

export default InstallationOrderDetail
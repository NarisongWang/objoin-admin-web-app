import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSalesOrder } from '../../features/salesOrder/salesOrderSlice'
import { parseDate } from '../../utils/utils'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'
import styles from './SalesOrderDetail.module.css'

const SalesOrderDetail = () => {
    const { salesOrderId, paramPage, paramText } = useParams()
    const { salesOrder, files, isLoading, error } = useSelector(
        (state) => state.salesOrder
    )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSalesOrder(salesOrderId))
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
                <BackButton url={`/sales-orders/${paramPage}/${paramText?paramText:''}`}></BackButton>
                Sales Order Details 
                {salesOrder.loaded?
                (<div className={styles.loaded}>Loaded</div>):
                (<div className={styles.notLoaded}>Not Loaded</div>)}
            </h2>
            <section className='form'>
            <form>
                <div className='form-group'>
                    <label htmlFor='installationOrderNumber'>Installation Order Number</label>
                    <input type='text' className='form-control' value={salesOrder.installationOrderNumber} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='clientName'>Customer</label>
                    <input type='text' className='form-control' value={salesOrder.customer} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='deliveryName'>Ship Name</label>
                    <input type='text' className='form-control' value={salesOrder.shipName} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='deliveryAddress'>Ship Address</label>
                    <input type='text' className='form-control' value={salesOrder.shipAddress} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='entyrDate'>Entry Date</label>
                    <input type='text' className='form-control' value={parseDate(salesOrder.entryDate)} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='dueDate'>Due Date</label>
                    <input type='text' className='form-control' value={parseDate(salesOrder.dueDate)} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='checkItems'>Installtion Items</label>
                    {salesOrder.orderDetails?
                    <textarea type='text' style={{height:`${salesOrder.orderDetails.split('|').length*20+25}px`, resize: 'none'}} value={salesOrder.orderDetails.replaceAll('&amp;','and').split('|').join('\n')} disabled></textarea>
                    :<textarea type='text' style={{height:'45px', resize: 'none', color: 'grey', fontStyle:'italic'}} className='form-control' value='* No installation items found' disabled></textarea>}
                </div>
                
                <div className='form-group'>
                    <label htmlFor='files'>PDF Files in<span style={{color:'blue', fontWeight:'bold'}}> Local File Server</span></label>
                    {files.length!==0?files.map((directory, index)=>(
                        <div key={index}>
                            <div style={{textAlign:'left', fontSize:'12px', fontStyle:'italic', color:"darkred"}}>Directory-  ... {directory.file_dir}</div>
                            {directory.files.map((file,index2)=>(
                                <li key={index2}><a href={directory.file_path.replaceAll('\\','/').replace('objoin-sql/public/SalesOrders/','//192.168.2.5:3088/')+file.file_name} target="_blank" rel="noreferrer" className="link">{file.file_name}</a></li>
                            ))}
                        </div>
                    )):salesOrder.installationOrderNumber?<div style={{textAlign:'left', color:'grey'}}>* No PDF files found in <span style={{color:'blue', fontStyle:'italic'}}>Z:/SalesOrders/{salesOrder.entryDate.toString().substring(0,4)}/{salesOrder.customer}/{salesOrder.shipName.trim()} - {salesOrder.shipAddress.substring(0,salesOrder.shipAddress.length-6)} - {salesOrder.installationOrderNumber}/</span> directory.</div>
                    :null}
                </div>
            </form>
        </section>
        </div>
    )
}

export default SalesOrderDetail

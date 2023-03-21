import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getInstallationOrder } from '../../features/installationOrder/installationOrderSlice'
import { parseDate } from '../../utils/utils'
import Spinner from '../../components/Spinner'
import BackButton from '../../components/BackButton'
import PdfSelectContainer from '../../components/PdfSelectContainer'
import styles from './InstallationOrderSetup.module.css'

const InstallationOrderSetup = () => {
    const { installationOrderId, paramPage, paramText } = useParams()

    const [installers, setInstallers] = useState([])
    const [deliverers, setDeliverers] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [directories, setDirectories] = useState([])
    
    const { dictionary } = useSelector(
        (state)=>state.auth
    )
    const { installationOrder, users, files, isLoading, error } = useSelector(
        (state) => state.installationOrder
    )

    const selectRef1 = useRef(null)
    const selectRef2 = useRef(null)
    const selectRef3 = useRef(null)
    const selectRef4 = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getInstallationOrder(installationOrderId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        if(error!==''){
            toast.error(error)
        }
    },[error])

    const onSubmit = (e) =>{
        e.preventDefault()
        if(selectedFiles.length===0){
            toast.warning('Please select at least one file')
            return
        }
        if(deliverers.length===0){
            toast.warning('Please select at least one deliverer')
            return
        }
        if(installers.length===0){
            toast.warning('Please select at least one installer')
            return
        }
    }

    const addDeliverer = (e) =>{}
    const removeDeliverer = (e) =>{}
    const addInstaller = (e) =>{}
    const removeInstaller = (e) =>{}

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <BackButton url={`/installation-orders/${paramPage}/${paramText?paramText:''}`}></BackButton>
            <section className={styles.heading}>
                <h5>Set Up Installation Order</h5>
            </section>

            <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='installationOrderNumber'>Installation Order Number</label>
                    <input type='text' className='form-control' value={installationOrder.installationOrderNumber} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='clientName'>Customer</label>
                    <input type='text' className='form-control' value={installationOrder.customer} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='deliveryAddress'>Ship Name</label>
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
                    <label htmlFor='workStatus'>Work Status</label>
                    <input type='text' className='form-control' value={dictionary.workStatus[installationOrder.workStatus]?dictionary.workStatus[installationOrder.workStatus].statusDesc:''} disabled></input>
                </div>
                <div className='form-group'>
                    <label htmlFor='files'>Files</label>
                    {files.length!==0?files.map((directory,index)=>(
                        <PdfSelectContainer 
                            key={index} 
                            directory={directory}
                            selectedFiles={selectedFiles} 
                            setSelectedFiles={setSelectedFiles}
                        />
                    )):<div style={{textAlign:'left', color:'grey'}}>* No PDF files found in <span style={{color:'blue', fontStyle:'italic'}}>Z:/SalesOrders/{installationOrder.entryDate.toString().substring(0,4)}/{installationOrder.customer}/{installationOrder.shipName.trim()} - {installationOrder.shipAddress.substring(0,installationOrder.shipAddress.length-6)} - {installationOrder.installationOrderNumber}</span> directory.</div>}
                </div>

                <div className='form-group-horizontal'>
                    <div className='form-group'>
                        <label htmlFor='users'>Deliverer &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                        <select ref={selectRef3} size="5">
                        </select>
                    </div>
                    <div className='form-group-vertical'>
                        <label htmlFor='users'></label>
                        <div className='form-group'>
                            <button className='btn-hide'> &nbsp;</button>
                            <button className='btn btn-sm2' onClick={addDeliverer}>&#x2190;add</button>
                            <button className='btn-hide'> &nbsp;</button>
                            <button className='btn btn-sm2' onClick={removeDeliverer}>&#x2192;remove</button>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='users'>Staff List &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                        <select ref={selectRef4} size="5">
                        {users.map((user,i) =>(
                            user.isActive&&user.userType===1? (
                                <option key={i} value={user._id}> {user.fullName} </option>)
                                :null
                        ))}
                        </select>
                    </div>
                </div>
                <div className='form-group-horizontal'>
                    <div className='form-group'>
                        <label htmlFor='users'>Installer &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                        <select ref={selectRef1} size="5">
                        </select>
                    </div>
                    <div className='form-group-vertical'>
                        <label htmlFor='users'></label>
                        <div className='form-group'>
                            <button className='btn-hide'> &nbsp;</button>
                            <button className='btn btn-sm2' onClick={addInstaller}>&#x2190;add</button>
                            <button className='btn-hide'> &nbsp;</button>
                            <button className='btn btn-sm2' onClick={removeInstaller}>&#x2192;remove</button>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='users'>Staff List &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
                        <select ref={selectRef2} size="5">
                        {users.map((user,i) =>(
                            user.isActive&&user.userType===2? (
                                <option key={i} value={user._id}> {user.fullName} </option>)
                                :null
                        ))}
                        </select>
                    </div>
                </div>
                <div className='form-group'>
                    <button className="btn btn-block">
                        Submit
                    </button>
                </div>
            </form>
        </section>
        </>
    )
}

export default InstallationOrderSetup

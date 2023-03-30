import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getInstallationOrders, 
        getTotalCount,
        deleteInstallationOrder,
        closeInstallationOrder } from '../../features/installationOrder/installationOrderSlice'
import { toast } from 'react-toastify'
import BackButton from '../../components/BackButton'
import InstallationOrderItem from '../../components/InstallationOrderItem'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import { FaCloudUploadAlt, 
        FaEdit, 
        FaMinusSquare, 
        FaTrashAlt, 
        FaFileAlt, 
        FaRedoAlt } from 'react-icons/fa'
import styles from './InstallationOrderList.module.css'

const InstallationOrderList = () => {
    const pageSize = 10
    const { paramPage, paramText } = useParams()
    const [ currentPage, setCurrentPage ] = useState(paramPage?parseInt(paramPage):1)
    const [ searchText, setSearchText ] = useState(paramText?paramText:'')
    const [ select, setSelect ] = useState(null)

    const { installationOrders, totalCount, isLoading, error }  = useSelector(
        (state) => state.installationOrder
    )

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        const firstPageIndex = (currentPage - 1) * pageSize
        dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        if(error!==''){
            toast.error(error)
        }
    },[error])

    const onPageChange = (page) =>{
        setSelect(null)
        setCurrentPage(page)
        const firstPageIndex = (page - 1) * pageSize
        dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
        // navigate(`/installation-orders/${page}/${paramText?paramText:''}`)
        // navigate(0)
    }

    const search = () =>{
        setSelect(null)
        setCurrentPage(1)
        dispatch(getInstallationOrders({ firstPageIndex:0, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
    }

    const clearSearch = () =>{
        setSelect(null)
        setSearchText('')
        setCurrentPage(1)
        dispatch(getInstallationOrders({ firstPageIndex:0, pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    }

    const selectOrder = (_id, installationOrderNumber, workStatus) =>{
        setSelect({
            _id,
            installationOrderNumber,
            workStatus
        })
    }

    const setupOrder = () => {
        navigate(`/installation-order-setup/${select._id}/setup/${currentPage}/${searchText}`)
    }

    const editOrder = () => {
        navigate(`/installation-order-edit/${select._id}/edit/${currentPage}/${searchText}`)
    }

    const closeOrder = () => {
        if (window.confirm("Are you sure you want to close this order?")) {
            dispatch(closeInstallationOrder({installationOrderId:select._id}))
            .unwrap().then(()=>{
                setSelect(null)
                const firstPageIndex = (currentPage - 1) * pageSize
                dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
                toast.success('Installation Order Closed!')
            }).catch(toast.error)
        } else {}
    }

    const deleteOrder = () =>{
        if (window.confirm("Are you sure you want to delete this order?")) {
            dispatch(deleteInstallationOrder({installationOrderId:select._id}))
            .unwrap().then(()=>{
                setSelect(null)
                const firstPageIndex = (currentPage - 1) * pageSize
                dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
                toast.success('Installation Order Deleted!')
            }).catch(toast.error)
        } else {}
    }

    const openReport = () => {
        window.open(`/installation-order-report/${select._id}`,'_blank')
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className={styles.flexRow}>
                <BackButton url='/' />
                <h1>Installation Orders</h1>
                <div style={{width:'150px'}}></div>
            </div>

            <div className={styles.flexRow}>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <input 
                        className=''
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder='Installation Order Number'></input>
                    <button className={styles.buttonSearch} onClick={()=>{search()}}>Search</button>
                    <button className={styles.buttonSearch} onClick={()=>{clearSearch()}}>Clear</button>
                </div>
                <div className={styles.flexRow}>
                    <div 
                        className={(select&&select.workStatus===0)?styles.buttonBlue:styles.buttonGrey}
                        onClick={(select&&select.workStatus===0)?()=>{setupOrder()}:undefined}
                    ><FaCloudUploadAlt/> Setup</div>
                    <div
                        className={(select&&select.workStatus===1)?styles.buttonBlue:styles.buttonGrey}
                        onClick={(select&&select.workStatus===1)?()=>{editOrder()}:undefined}
                    ><FaEdit/> Edit</div>
                    <div 
                        className={(select&&select.workStatus===4)?styles.buttonBlue:styles.buttonGrey}
                        onClick={(select&&select.workStatus===4)?()=>{closeOrder()}:undefined}
                    ><FaMinusSquare/> Close</div>
                    <div 
                        className={(select&&(select.workStatus===0||select.workStatus===1))?styles.buttonBlue:styles.buttonGrey}
                        onClick={(select&&(select.workStatus===0||select.workStatus===1))?()=>{deleteOrder()}:undefined}
                    ><FaTrashAlt/> Delete</div>
                    <div
                        className={(select&&(select.workStatus===4||select.workStatus===5))?styles.buttonBlue:styles.buttonGrey}
                        onClick={(select&&(select.workStatus===4||select.workStatus===5))?()=>{openReport()}:undefined}
                    ><FaFileAlt/> Open Report</div>
                    <div 
                        className={select?styles.buttonBlue:styles.buttonGrey}
                        onClick={select?()=>{setSelect(null)}:undefined}
                    ><FaRedoAlt/> Clear</div>
                </div>
            </div>

            <div className={styles.headings}>
                <div>Installation Order Number</div>
                <div>Work Status</div>
                <div>Customer</div>
                <div>Ship Name</div>
                <div>Ship Address</div>
                <div>Entry Date</div>
                <div>Due Date</div>
            </div>
         
            {installationOrders.map((installationOrder) => {
                return (
                    <div key={installationOrder._id} onClick={()=>selectOrder(installationOrder._id, installationOrder.installationOrderNumber, installationOrder.workStatus)}>
                        <InstallationOrderItem 
                            installationOrder={installationOrder} 
                            currentPage={currentPage} 
                            searchText={searchText}
                            select={select}
                        />
                    </div>
                )
            })} 
            
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={page => onPageChange(page)}
            />
        </>
    )
}

export default InstallationOrderList
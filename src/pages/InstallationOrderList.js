import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getInstallationOrders, getTotalCount } from '../features/installationOrder/installationOrderSlice'
import { toast } from 'react-toastify'
import BackButton from '../components/BackButton'
import InstallationOrderItem from '../components/InstallationOrderItem'
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'
import styles from './InstallationOrderList.module.css'

const InstallationOrderList = () => {
    const pageSize = 10
    const [ searchText, setSearchText ] = useState('')
    const [ currentPage, setCurrentPage ] = useState(1)

    const { installationOrders, totalCount, isLoading, error }  = useSelector(
        (state) => state.installationOrder
    )
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getInstallationOrders({ firstPageIndex:0, pageSize:pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    },[dispatch])

    useEffect(()=>{
        if(error!==''){
            toast.error(error)
        }
    },[error])

    useEffect(()=>{
        const firstPageIndex = (currentPage - 1) * pageSize;
        dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
    },[currentPage, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='flex-row'>
                <BackButton url='/' />
                <h1>Installation Orders</h1>
                <div>&nbsp;</div>
            </div>
            
            <div style={{marginBottom:"10px"}}>
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Installation Order Number'></input>
                <button onClick={()=>{}} style={{marginLeft:"10px",width:"80px"}}>Search</button>
                <button onClick={()=>{}} style={{marginLeft:"10px",width:"80px"}}>Clear</button>
            </div>

            <div className={styles.headings}>
                <div>Installation Order Number</div>
                <div>Work Status</div>
                <div>Customer</div>
                <div>Ship Name</div>
                <div>Ship Address</div>
                <div>Due Date</div>
                <div>Details</div>
            </div>

            {installationOrders.map((installationOrder) => {
                return <InstallationOrderItem key={installationOrder._id} installationOrder={installationOrder} />
            })}

            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}

export default InstallationOrderList
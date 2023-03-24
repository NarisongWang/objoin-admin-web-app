import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getInstallationOrders, getTotalCount } from '../../features/installationOrder/installationOrderSlice'
import { toast } from 'react-toastify'
import BackButton from '../../components/BackButton'
import InstallationOrderItem from '../../components/InstallationOrderItem'
import Spinner from '../../components/Spinner'
import Pagination from '../../components/Pagination'
import styles from './InstallationOrderList.module.css'

const InstallationOrderList = () => {
    const pageSize = 10
    const { paramPage, paramText } = useParams()
    const [ currentPage, setCurrentPage ] = useState(paramPage?parseInt(paramPage):1)
    const [ searchText, setSearchText ] = useState(paramText?paramText:'')

    const { installationOrders, totalCount, isLoading, error }  = useSelector(
        (state) => state.installationOrder
    )
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
        setCurrentPage(page)
        const firstPageIndex = (page - 1) * pageSize
        dispatch(getInstallationOrders({ firstPageIndex, pageSize, searchText }))
    }

    const search = () =>{
        setCurrentPage(1)
        dispatch(getInstallationOrders({ firstPageIndex:0, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
    }

    const clearSearch = () =>{
        setSearchText('')
        setCurrentPage(1)
        dispatch(getInstallationOrders({ firstPageIndex:0, pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    }


    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='flex-row'>
                <BackButton url='/' />
                <h1>Installation Orders</h1>
                <div style={{width:'150px'}}></div>
            </div>

            <div style={{marginBottom:"10px"}}>
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Installation Order Number'></input>
                <button onClick={()=>{search()}} style={{marginLeft:"10px",width:"80px"}}>Search</button>
                <button onClick={()=>{clearSearch()}} style={{marginLeft:"10px",width:"80px"}}>Clear</button>
            </div>

            <div className={styles.headings}>
                <div>Installation Order Number</div>
                <div>Work Status</div>
                <div>Customer</div>
                <div>Ship Name</div>
                <div>Ship Address</div>
                <div>Due Date</div>
                <div></div>
            </div>
         
            {installationOrders.map((installationOrder) => {
                return <InstallationOrderItem key={installationOrder._id} installationOrder={installationOrder} currentPage={currentPage} searchText={searchText}/>
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
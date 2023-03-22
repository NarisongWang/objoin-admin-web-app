import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSalesOrders, getTotalCount, createInstallationOrders } from '../../features/salesOrder/salesOrderSlice'
import { toast } from 'react-toastify'
import SalesOrderItem from '../../components/SalesOrderItem'
import BackButton from '../../components/BackButton'
import Pagination from '../../components/Pagination'
import Spinner from '../../components/Spinner'
import { FaDownload } from 'react-icons/fa'
import styles from './SalesOrderList.module.css'

const SalesOrderList = () => {
    const pageSize = 10
    const { paramPage, paramText } = useParams()
    const [ currentPage, setCurrentPage ] = useState(paramPage?parseInt(paramPage):1)
    const [ searchText, setSearchText ] = useState(paramText?paramText:'')
    const [select, setSelect] = useState([])

    const { salesOrders, totalCount, isLoading, error }  = useSelector(
        (state) => state.salesOrder
    )

    const dispatch = useDispatch()

    useEffect(()=>{
        const firstPageIndex = (currentPage - 1) * pageSize
        dispatch(getSalesOrders({ firstPageIndex, pageSize, searchText }))
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
        dispatch(getSalesOrders({ firstPageIndex, pageSize, searchText }))
    }

    const search = () =>{
        setCurrentPage(1)
        dispatch(getSalesOrders({ firstPageIndex:0, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
    }

    const clearSearch = () =>{
        setSearchText('')
        setCurrentPage(1)
        dispatch(getSalesOrders({ firstPageIndex:0, pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    }

    const loadOrders = () =>{
        if(select.length===0){
            toast.warning('Please select at least one sales order!')
        }else{
            const selectOrder = select.sort(function(a, b) {
              return a - b;
            })
            let selectedSalesOrders = []
            for (let i = 0; i < selectOrder.length; i++) {
                selectedSalesOrders.push(salesOrders[selectOrder[i]]);
            }
            dispatch(createInstallationOrders({salesOrders:selectedSalesOrders}))
            .unwrap().then(()=>{
                toast.success('Selected sales orders has been successfully loaded!')
            }).catch(toast.error)
        }
    }
    
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='flex-row'>
                <BackButton url='/'/>
                <h1>Load Sales Orders (from Seradex)</h1>
                <button className='btn btn-back' onClick={loadOrders}>
                    <FaDownload />Load
                </button>
            </div>

            <div style={{marginBottom:"10px"}}>
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='Sales Order Number'></input>
                <button onClick={()=>search()} style={{marginLeft:"10px",width:"80px"}}>Search</button>
                <button onClick={()=>clearSearch()} style={{marginLeft:"10px",width:"80px"}}>Clear</button>
            </div>

            <div>
                <div className={styles.headings}>
                    <div>Select</div>
                    <div>Sales Order</div>
                    <div>Due Date</div>
                    <div>Customer</div>
                    <div>Ship Name</div>
                    <div>Ship Address</div>
                    <div>Status</div>
                </div>
                <br />
                {salesOrders.map((salesOrder,index) =>(
                    <SalesOrderItem key={salesOrder.ID} index={index} salesOrder={salesOrder} select={select} setSelect={setSelect} currentPage={currentPage} searchText={searchText}/>
                ))}
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    onPageChange={page => onPageChange(page)}
                />
            </div>
        </>
    )
}

export default SalesOrderList

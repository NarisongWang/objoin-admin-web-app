import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEmployees, getTotalCount } from '../../features/employee/employeeSlice' 
import EmployeeItem from '../../components/EmployeeItem'
import Pagination from '../../components/Pagination'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import styles from './EmployeeList.module.css'

const EmployeeList = () => {
    const pageSize = 10
    const { paramPage, paramText } = useParams()
    const [ currentPage, setCurrentPage ] = useState(paramPage?parseInt(paramPage):1)
    const [ searchText, setSearchText ] = useState(paramText?paramText:'')

    const { employees, totalCount, isLoading, error } = useSelector(
        (state) => state.employee
    )

    const dispatch = useDispatch()

    useEffect(()=>{
        const firstPageIndex = (currentPage - 1) * pageSize
        dispatch(getEmployees({ firstPageIndex, pageSize, searchText }))
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
        dispatch(getEmployees({ firstPageIndex, pageSize, searchText }))
    }

    const search = () =>{
        setCurrentPage(1)
        dispatch(getEmployees({ firstPageIndex:0, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
    }

    const clearSearch = () =>{
        setSearchText('')
        setCurrentPage(1)
        dispatch(getEmployees({ firstPageIndex:0, pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <div className='flex-row'>
                <BackButton url='/' />
                <h1>Employees</h1>
                <div style={{width:'150px'}}></div>
            </div>

            <div style={{marginBottom:"10px"}}>
                <input 
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder='First name or Last name'></input>
                <button onClick={()=>search()} style={{marginLeft:"10px",width:"80px"}}>Search</button>
                <button onClick={()=>clearSearch()} style={{marginLeft:"10px",width:"80px"}}>Clear</button>
            </div>
            <div>
                <div className={styles.headings}>
                    <div>Emp Code</div>
                    <div>Emp Type</div>
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Email</div>
                    <div>Account Status</div>
                </div>
                <br />
                {employees.map((employee,index) =>(
                    <EmployeeItem key={employee.EmployeeID} employee={employee} currentPage={currentPage} searchText={searchText}/>
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

export default EmployeeList
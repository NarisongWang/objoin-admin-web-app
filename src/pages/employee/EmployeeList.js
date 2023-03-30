import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getEmployees, getTotalCount, resendEmail } from '../../features/employee/employeeSlice' 
import EmployeeItem from '../../components/EmployeeItem'
import Pagination from '../../components/Pagination'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import { FaUserLock,
        FaUserPlus,
        FaUserTimes,
        FaEnvelope } from 'react-icons/fa'
import styles from './EmployeeList.module.css'

const EmployeeList = () => {
    const pageSize = 10
    const { paramPage, paramText } = useParams()
    const [ currentPage, setCurrentPage ] = useState(paramPage?parseInt(paramPage):1)
    const [ searchText, setSearchText ] = useState(paramText?paramText:'')
    const [ select, setSelect ] = useState(null)

    const { employees, totalCount, isLoading, error } = useSelector(
        (state) => state.employee
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        setSelect(null)
        setCurrentPage(page)
        const firstPageIndex = (page - 1) * pageSize
        dispatch(getEmployees({ firstPageIndex, pageSize, searchText }))
    }

    const search = () =>{
        setSelect(null)
        setCurrentPage(1)
        dispatch(getEmployees({ firstPageIndex:0, pageSize, searchText }))
        dispatch(getTotalCount({searchText}))
    }

    const clearSearch = () =>{
        setSelect(null)
        setSearchText('')
        setCurrentPage(1)
        dispatch(getEmployees({ firstPageIndex:0, pageSize, searchText:'' }))
        dispatch(getTotalCount({searchText:''}))
    }

    const selectEmployee = (EmployeeID,email,status,userType) =>{
        setSelect({
            EmployeeID,
            email,
            status,
            userType
        })
    }

    // const activateAccount = () =>{

    // }

    const closeAccount = () =>{

    }

    const resend = () =>{
        dispatch(resendEmail({email:select.email}))
        .unwrap().then(()=>{
            toast.success('Email sent successfully!')
        }).catch(toast.error)
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

            <div className='flex-row'>
                <div>
                    <input 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder='First name or Last name'></input>
                    <button onClick={()=>search()} style={{marginLeft:"10px",width:"80px"}}>Search</button>
                    <button onClick={()=>clearSearch()} style={{marginLeft:"10px",width:"80px"}}>Clear</button>
                </div>
                <div className='flex-row'>
                    <div 
                        className={styles.buttonGrey}
                    ><FaUserLock/> Activate as Admin</div>
                    <div 
                        className={select&&select.status===undefined?styles.buttonBlue:styles.buttonGrey}
                        onClick={select?()=>{navigate(`/employee/${select.EmployeeID}/${currentPage}/${searchText}`)}:undefined}
                    ><FaUserPlus/> Activate Account</div>
                    <div 
                        className={select&&select.status!==undefined?styles.buttonBlue:styles.buttonGrey}
                        onClick={select?()=>{closeAccount()}:undefined}
                    ><FaUserTimes/> Close Account</div>
                    <div 
                        className={select&&select.status===0?styles.buttonBlue:styles.buttonGrey}
                        onClick={select?()=>{resend()}:undefined}
                    ><FaEnvelope/> Resend Validation Email</div>
                </div>
            </div>
            <div>
                <div className={styles.headings}>
                    <div>Emp Code</div>
                    <div>Emp Type</div>
                    <div>First Name</div>
                    <div>Last Name</div>
                    <div>Phone</div>
                    <div>Email</div>
                    <div>Account Status</div>
                </div>
                {employees.map((employee) =>(
                    <div key={employee.EmployeeID} onClick={()=>{selectEmployee(employee.EmployeeID,employee.email,employee.status,employee.userType)}}>
                        <EmployeeItem 
                            employee={employee} 
                            currentPage={currentPage} 
                            searchText={searchText}
                            select={select}/>
                    </div>
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
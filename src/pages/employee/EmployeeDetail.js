import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' 
import { getEmployee, activateAccount } from '../../features/employee/employeeSlice'
import BackButton from '../../components/BackButton'
import Spinner from '../../components/Spinner'
import styles from './EmployeeDetail.module.css'

const EmployeeDetail = () => {
  const { employeeId, paramPage, paramText } = useParams()
  const { dictionary } = useSelector(
    (state)=>state.auth
  )
  const { employee,  isLoading, error } = useSelector(
    (state) => state.employee
  )
  const [ employeeType, setEmployeeType ] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getEmployee(employeeId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
      if(error!==''){
          toast.error(error)
      }
  },[error])

  const activate = (firstName, email) =>{
    if (email==='') {
      toast.warning('This employee doesn\'t have a valid email!')
      return 
    }
    if(!employeeType){
      toast.warning('Please select an employee type fot this account!')
      return
    }
    dispatch(
      activateAccount({ fullName:firstName, email:email, userType:employeeType}))
      .unwrap().then(()=>{
      navigate(`/employees/${paramPage}/${paramText?paramText:''}`)
      toast.success('Account has been successfully activated!')
    }).catch(toast.error)

  }

  if(isLoading){
      return <Spinner />
  }

  return (
    <div className={styles.employeeDetail}>
      <h2>
          <BackButton url={`/employees/${paramPage}/${paramText?paramText:''}`}></BackButton>
          Staff Details 
          {employee.status===undefined?(<span className={styles.notLoaded}>Not activated</span>):
            employee.status===1?(<span className={styles.loaded}>Activated</span>):
             employee.status===0?(<span className={styles.waiting}>Waiting for verification</span>):null}
      </h2>
      <section className='form'>
        <form>
          <div className='form-group'>
              <label htmlFor='code'>Employee Code</label>
              <input type='text' className='form-control' value={employee.EmployeeCode} disabled></input>
          </div>
          <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input type='text' className='form-control' value={employee.FirstName} disabled></input>
          </div>
          <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text' className='form-control' value={employee.LastName} disabled></input>
          </div>
          <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='text' className='form-control' value={employee.email} disabled></input>
          </div>
          <div className='form-group'>
              <label htmlFor='cellPhone'>Cell Phone</label>
              <input type='text' className='form-control' value={employee.CellPhone} disabled></input>
          </div>

          {employee.status === undefined?(
            <div className='form-group'>
              <label htmlFor='userType'>Select User Type</label>
              <div className={styles.container}>
                {dictionary.userType.map((employeeType) =>(
                    <div key={employeeType.typeId} className={styles.radio}>
                        <input type="radio" id={employeeType.typeId} name="emp_type" value={employeeType.typeDesc} onClick={()=>setEmployeeType(employeeType.typeId)}/>
                        <label htmlFor={employeeType.typeId}>{employeeType.typeDesc}</label>
                    </div>
                ))}
              </div>
            </div>
          ):(
            <div className='form-group'>
              <label htmlFor='userType'>User Type</label>
              <input type='text' className='form-control' value={dictionary.userType[employee.userType].typeDesc} disabled></input>
            </div>
          )}
          
        </form>
        {employee.status === undefined?(
            <button onClick={()=>activate(employee.FirstName, employee.email)} className='btn btn-block'> Activate Account</button>
        ):employee.status === 0?(
          <>
            <button onClick={()=>{}} className='btn btn-block btn-danger'> Close Account</button>
            <button onClick={()=>{}} className='btn btn-block btn-danger'> Resend Validation Email</button>
          </>
        ):employee.status === 1?(
            <button onClick={()=>{}} className='btn btn-block btn-danger'> Close Account</button>
        ):null}
      </section>
    </div>
  )
}

export default EmployeeDetail

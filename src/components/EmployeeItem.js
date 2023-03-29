import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './EmployeeItem.module.css'

const EmployeeItem = ({ employee, currentPage, searchText, select }) => {
  //employee.status: undefined:Not Active, 1:Active, 0:Waiting for verification
  const { dictionary } = useSelector(
    (state) => state.auth
  )
  const typeDesc = dictionary.userType&&employee.userType?
        dictionary.userType[employee.userType].typeDesc:'N/A'
  return (
    <div className={select&&select.EmployeeID===employee.EmployeeID?styles.seleced:styles.employeeItems}>
      <Link to={`/employee/${employee.EmployeeID}/${currentPage}/${searchText}`} className='link'>
          {employee.EmployeeCode}
      </Link> 
      <div>{typeDesc}</div>
      <div>{employee.FirstName}</div>
      <div>{employee.LastName}</div>
      <div>{employee.CellPhone}</div>
      <div>{employee.email}</div>
      {employee.status===undefined?(<div className={styles.notLoaded}>Not activated</div>):null}
      {employee.status===1?(<div className={styles.loaded}>Activated</div>):null}
      {employee.status===0?(<div className={styles.waiting}>Waiting for verification</div>):null}
    </div>
  )
}

export default EmployeeItem
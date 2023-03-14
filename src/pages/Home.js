import React from 'react'
import { Link } from 'react-router-dom';
import { FaPeopleArrows, FaStaylinked, FaListAlt, FaCheckSquare } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      <section>
        <h1> Installation Order Management</h1>
        <br />
        <Link to='/installation-orders' className='btn btn-menu'>
            <FaListAlt />&nbsp; Installation Order List
        </Link>
        <Link to='/load-installation-orders' className='btn btn-menu'>
            <FaStaylinked />&nbsp; Load Installation Orders
        </Link>
        <Link to='/manage-employees' className='btn btn-menu'>
            <FaPeopleArrows />&nbsp; Manage Employees
        </Link>
        <Link to='' className='btn btn-menu'>
            <FaCheckSquare />&nbsp; Manage Check List
        </Link>
      </section>
    </div>
  )
}

export default Home

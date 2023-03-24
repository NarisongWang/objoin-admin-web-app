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
            <FaListAlt />Manage Installation Orders
        </Link>
        <Link to='/sales-orders' className='btn btn-menu'>
            <FaStaylinked />Load Sales Orders
        </Link>
        <Link to='/employees' className='btn btn-menu'>
            <FaPeopleArrows />Manage Employees
        </Link>
        <Link to='/check-list' className='btn btn-menu'>
            <FaCheckSquare />Manage Check List
        </Link>
      </section>
    </div>
  )
}

export default Home
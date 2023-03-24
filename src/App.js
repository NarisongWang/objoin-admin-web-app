import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import PageNotFound from './pages/home/PageNotFound'
import DisplayPhoto from './pages/home/DisplayPhoto'
import Login from './pages/auth/Login'
import InstallationOrderList from './pages/installationOrder/InstallationOrderList'
import InstallationOrderDetail from './pages/installationOrder/InstallationOrderDetail'
import InstallationOrderSetup from './pages/installationOrder/InstallationOrderSetup'
import InstallationOrderReport from './pages/installationOrder/InstallationOrderReport'
import SalesOrderList from './pages/salesOrder/SalesOrderList'
import SalesOrderDetail from './pages/salesOrder/SalesOrderDetail'
import EmployeeList from './pages/employee/EmployeeList'
import EmployeeDetail from './pages/employee/EmployeeDetail'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const BasicLayout = () =>{
  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const LayoutWithoutHeader = () =>{
  return(
    <>
      <Outlet />
      <Footer />
    </>
  )
}

const App = () =>{
  return (
    <div className='container'>
      <Router>
        <Routes>
          {/* BasicLayout no PrivateRoute */}
          <Route path='/login' element={<BasicLayout />} >
              <Route index element={<Login />} />
          </Route>
          {/* BasicLayout & PrivateRoute */}
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<BasicLayout />} >
                <Route index element={<Home />} />
                <Route path='/installation-orders/:paramPage?/:paramText?' element={<InstallationOrderList />} />
                <Route path='/installation-order/:installationOrderId/:paramPage/:paramText?' element={<InstallationOrderDetail />} />
                <Route path='/installation-order-setup/:installationOrderId/:paramType/:paramPage/:paramText?' element={<InstallationOrderSetup />} />
                <Route path='/installation-order-edit/:installationOrderId/:paramType/:paramPage/:paramText?' element={<InstallationOrderSetup />} />
                <Route path='/sales-orders/:paramPage?/:paramText?' element={<SalesOrderList />} />
                <Route path='/sales-order/:salesOrderId/:paramPage/:paramText?' element={<SalesOrderDetail />} />
                <Route path='/employees/:paramPage?/:paramText?' element={<EmployeeList />} />
                <Route path='/employee/:employeeId/:paramPage/:paramText?' element={<EmployeeDetail />} />
                <Route path='/*' element={<PageNotFound />} />
            </Route>
            {/* LayoutWithoutHeader & PrivateRoute */}
            <Route path='/display-photo/:photoUrl' element={<LayoutWithoutHeader />} >
              <Route index element={<DisplayPhoto />} />
            </Route>
          </Route>
          <Route path='/installation-order-report/:installationOrderId' element={<PrivateRoute />} >
              <Route path='/installation-order-report/:installationOrderId' element={<InstallationOrderReport />} />
            </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App;
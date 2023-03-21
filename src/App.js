import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import PageNotFound from './pages/home/PageNotFound'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import InstallationOrderList from './pages/installationOrder/InstallationOrderList'
import InstallationOrderDetail from './pages/installationOrder/InstallationOrderDetail'
import InstallationOrderSetup from './pages/installationOrder/InstallationOrderSetup'
import InstallationOrderReport from './pages/installationOrder/InstallationOrderReport'
import SalesOrderList from './pages/salesOrder/SalesOrderList'
import DisplayPhoto from './pages/home/DisplayPhoto'
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
          {/* BasicLayout without PrivateRoute */}
          <Route path='/login' element={<BasicLayout />} >
              <Route index element={<Login />} />
          </Route>
          {/* BasicLayout with PrivateRoute */}
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<BasicLayout />} >
                <Route index element={<Home />} />
                <Route path='/installation-orders/:paramPage?/:paramText?' element={<InstallationOrderList />} />
                <Route path='/installation-order/:installationOrderId/:paramPage/:paramText?' element={<InstallationOrderDetail />} />
                <Route path='/installation-order-setup/:installationOrderId/:paramPage/:paramText?' element={<InstallationOrderSetup />} />
                <Route path='/sales-orders/:paramPage?/:paramText?' element={<SalesOrderList />} />
                
                <Route path='/display-photo/:photoUrl' element={<DisplayPhoto />} />
                <Route path='/*' element={<PageNotFound />} />
            </Route>
            {/* LayoutWithoutHeader & PrivateRoute */}
            <Route path='/installation-report' element={<LayoutWithoutHeader />} >
              <Route index element={<InstallationOrderReport />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App;
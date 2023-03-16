import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import InstallationOrderList from './pages/InstallationOrderList'
import InstallationOrderDetail from './pages/InstallationOrderDetail'
import SalesOrderList from './pages/SalesOrderList'

// eslint-disable-next-line
import InstallationReport from './pages/InstallationReport'
import DisplayPhoto from './pages/DisplayPhoto'
import TestPage from './pages/TestPage'
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
                <Route path='/sales-orders/:paramPage?/:paramText?' element={<SalesOrderList />} />
                
                <Route path='/display-photo/:photoUrl' element={<DisplayPhoto />} />
                <Route path='/*' element={<PageNotFound />} />
            </Route>
            {/* LayoutWithoutHeader with PrivateRoute */}
            <Route path='/test' element={<LayoutWithoutHeader />} >
              <Route index element={<TestPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App;
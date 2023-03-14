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
import InstallationReport from './pages/InstallationReport'
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
                <Route path='/installation-orders' element={<InstallationOrderList />} />
                <Route path='/*' element={<PageNotFound />} />
            </Route>
            {/* LayoutWithoutHeader with PrivateRoute */}
            <Route path='/test' element={<LayoutWithoutHeader />} >
              <Route index element={<InstallationReport />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App;
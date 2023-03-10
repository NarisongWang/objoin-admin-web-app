import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import Login from './pages/Login'
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
          <Route path='/' element={<BasicLayout />} >
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<PageNotFound />} />
          </Route>
          <Route path='/test' element={<LayoutWithoutHeader />} >
            <Route index element={<InstallationReport />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App;
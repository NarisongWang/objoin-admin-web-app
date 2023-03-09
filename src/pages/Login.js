import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import styles from './Login.module.css'

const Login = () => {
  return (
    <>
        <section>
            <h1>
                <FaSignInAlt style={{color:'#2196F3'}}></FaSignInAlt> Login
            </h1>
        </section>
    </>
  )
}

export default Login

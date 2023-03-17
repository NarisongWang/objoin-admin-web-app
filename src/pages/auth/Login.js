import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

const Login = () => {
    const [ formData, setFormData ] = useState({
        email:'',
        password:''
    })
    const { email, password } = formData
    const { user, isLoading, error } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(error!==''){
            toast.error(error)
        }
        if(user){
            navigate('/')
        }
    },[user, error, navigate])

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
    <>
        <section>
            <h1>
                <FaSignInAlt style={{color:'#2196F3'}}></FaSignInAlt> Login
            </h1>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input 
                        type='email' 
                        className='form-control' 
                        id='email' 
                        value={email} 
                        onChange={onChange} 
                        placeholder='Enter your email'>
                    </input>
                </div>
                <div className='form-group'>
                    <input 
                        type='password' 
                        className='form-control' 
                        id='password' 
                        value={password} 
                        onChange={onChange} 
                        placeholder='Enter your password'>
                    </input>
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
    )
}

export default Login
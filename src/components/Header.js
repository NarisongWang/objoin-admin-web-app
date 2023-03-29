import { useSelector, useDispatch } from 'react-redux'
import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import styles from './Header.module.css'

function Header() {

    const { user } = useSelector(
        (state) => state.auth
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <div className='logo'>
                <Link to='/'><img width={200} height={80} alt='OBJOIN' src={require('../assets/OBJOIN.png')}/></Link>
            </div>
            <ul>
                <div className='flex-row'>
                {user?(
                    <>
                        Hi { user.name }, &nbsp;
                        <li>
                            <button className='btn' onClick={onLogout}> <FaSignOutAlt /> Logout</button>
                        </li>
                    </>
                ):(
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/login'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
                </div>
            </ul>
        </header>
    )
}

export default Header
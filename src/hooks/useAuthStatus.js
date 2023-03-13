import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const useAuthStatus = () => {
    const [ loggedIn, setLoggedIn ] = useState(false)
    const [ checking, setChecking ] = useState(true)

    const { user } = useSelector((state) => state.auth)

    useEffect(()=>{
        if (user) {
            setLoggedIn(true)
        }

        setChecking(false)
    },[user])
  
    return { loggedIn, checking}
}

export default useAuthStatus
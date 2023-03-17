import React from 'react'
import { useParams } from 'react-router-dom'

const DisplayPhoto = () => {
  const { photoUrl } = useParams()
  return (
    <div>
      <h3>{photoUrl.replaceAll('-','/')}</h3>
      <div>&nbsp;</div>
      <img src={"https://objoinfiles.blob.core.windows.net/installation-orders/"+photoUrl.replaceAll('-','/')+"?"+process.env.REACT_APP_AZURE_STORAGE_CONN} alt="" width="1200" height="1600" />
    </div>
  )
}

export default DisplayPhoto
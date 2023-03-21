import React from 'react'

const CheckListItem = ({title,status,note}) => {
  return (
    <div style={{display:'flex',flexDirection:'row',borderBottom: '1px solid black',marginBottom:'2px',marginLeft:'10px'}}>
      <div style={{fontSize:'10px', width:'320px'}}>{title}</div>
      {title==='Other notes'?null:
      <div style={{fontSize:'10px', width:'150px'}}>
        <input style={{marginLeft:'5px'}} type="checkbox" id="check1" className='checked' name="check1" checked={status===1?true:false} readOnly/>
        <label htmlFor="check1">YES</label>
        <input style={{marginLeft:'5px'}} type="checkbox" id="check2" className='checked' name="check2" checked={status===2?true:false} readOnly/>
        <label htmlFor="check2">NO</label>
        <input style={{marginLeft:'5px'}} type="checkbox" id="check3" className='checked' name="check3" checked={status===3?true:false} readOnly/>
        <label htmlFor="check3">N/A</label>
      </div>}
      {title==='Other notes'?<div style={{fontSize:"10px",height:"40px"}}>{note}</div>:<div style={{fontSize:"10px"}}>{note}</div>}
    </div>
  )
}

export default CheckListItem
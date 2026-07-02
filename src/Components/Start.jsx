import React, { useState } from 'react'

import './Styles/Common.css'
import Top from './Popups/Top'

const Start = () => {
    const [show, setshow] = useState(false)
  return (
    <div>
      This is Start Screen
        <Top show={show} setShow={setshow}/>
        <button className='btn btn-primary' style={{cursor : 'pointer'}} onClick={()=>{
            setshow(true)
        }}>Bitton</button>
    </div>
  )
}

export default Start

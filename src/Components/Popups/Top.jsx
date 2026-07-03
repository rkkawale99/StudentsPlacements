import React, { useState } from 'react'


const Top = ({ show, setShow, title, msg }) => {
  const [closing, setClosing] = useState(false);
  
    const handleClose = () => {
      setClosing(true);
      setTimeout(() => {
        setShow(false);
        setClosing(false)
      }, 450); 
    };
  return (
    <div>
      {show && <div className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start bg-dark bg-opacity-50 slide-down ${closing ? "fade-out" : 'slide-up'}`} style={{zIndex : 10}}>
        <div className="bg-secondary p-4 rounded shadow my-3" style={{ minWidth: 400 }}>
          <h4>{title}</h4>
          <p>{msg}</p>
          <button className="btn btn-primary" onClick={handleClose}>Close</button>
        </div>
      </div>}
    </div>
  )
}

export default Top

import React from 'react'


const Top = ({ show, setShow }) => {
  return (
    <div>
      {show && <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start bg-dark bg-opacity-50 slide-down">
        <div className="bg-white p-4 rounded shadow my-3" style={{ minWidth: 400 }}>
          <h4>Popup</h4>
          <p>This popup is Top.</p>
          <button className="btn btn-primary" onClick={() => {
            setShow(false)
          }}>Close</button>
        </div>
      </div>}
    </div>
  )
}

export default Top

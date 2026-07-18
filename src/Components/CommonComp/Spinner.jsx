import React from 'react'

const Spinner = () => {
  return (
     <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-secondary text-center p-5">
            <div className="spinner-border text-primary mb-3"></div>
            <p className="text-light mb-0">Loading...</p>
          </div>
        </div>
      </div>
  )
}

export default Spinner

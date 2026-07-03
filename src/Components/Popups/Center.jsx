import React, { useEffect, useState } from "react";

const Center = ({ show, setShow }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false)
    }, 450); // Match animation duration
  };



  return (
   <div>
    {show &&  <div
      className={`position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 ${closing ? "fade-out" : 'slide-up'}`}
    >
      <div className={`modal-box bg-secondary p-4 rounded shadow`} style={{ minWidth: 400 }}>
        <h4>Popup</h4>
        <p>This popup is centered.</p>

        <button className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>}
   </div>
  );
};

export default Center;



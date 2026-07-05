import React, { useEffect, useState } from "react";

const ViewApplication = ({ show, setShow, selectedApplication }) => {
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
    {show && (
  <>
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Application Details
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={() => setShow(false)}
            ></button>
          </div>

          <div className="modal-body">

            <div className="row">

              <div className="col-md-6 mb-3">
                <strong>Company</strong>
                <p>{selectedApplication?.company}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Role</strong>
                <p>{selectedApplication?.role}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Applied Date</strong>
                <p>{selectedApplication?.applied}</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Status</strong>
                <span
                  className={`badge bg-${
                    selectedApplication?.status === "Selected"
                      ? "success"
                      : selectedApplication?.status === "Rejected"
                      ? "danger"
                      : selectedApplication?.status === "Interview Scheduled"
                      ? "warning"
                      : selectedApplication?.status === "Shortlisted"
                      ? "info"
                      : "secondary"
                  }`}
                >
                  {selectedApplication?.status}
                </span>
              </div>
{/* Use Information from API */}
              <div className="col-md-6 mb-3">
                <strong>Package</strong>
                <p>₹12 LPA</p>
              </div>

              <div className="col-md-6 mb-3">
                <strong>Location</strong>
                <p>Pune</p>
              </div>

              <div className="col-12">
                <strong>Job Description</strong>

                <p className="text-muted mt-2">
                  Develop and maintain enterprise web applications
                  using Java Spring Boot, React.js and MySQL.
                  Participate in code reviews, testing and deployment.
                </p>
              </div>

            </div>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>

            <button className="btn btn-primary">
              Download Offer
            </button>

          </div>

        </div>
      </div>
    </div>
  </>
)}
   </div>
  );
};

export default ViewApplication;



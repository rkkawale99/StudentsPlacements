
import React from "react";
// onProfile and on Loguout
export default function CompanyNavbar({companyName="TechNova Pvt. Ltd."}){
  return (
   
   
        <div className="ms-auto d-flex align-items-center gap-3">
          <button className="btn btn-outline-light position-relative">
            <i className="bi bi-bell"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
          </button>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown">
              <img src="https://ui-avatars.com/api/?name=HR&background=0D6EFD&color=fff"
                width="38" height="38" className="rounded-circle" alt="HR"/>
              <div className="text-start">
                <div className="fw-semibold">{companyName}</div>
                <small className="text-muted">HR Manager</small>
              </div>
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item">Company Profile</button></li>
              <li><button className="dropdown-item">Settings</button></li>
              <li><hr className="dropdown-divider"/></li>
              <li><button className="dropdown-item text-danger">Logout</button></li>
            </ul>
          </div>
        </div>


  );
}

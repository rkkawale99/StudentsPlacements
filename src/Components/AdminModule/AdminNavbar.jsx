import React from "react";

export default function AdminNavbar({
  adminName = "Placement Officer",
  onProfile,
  onLogout,
}) {
  return (



        <div className="ms-auto d-flex align-items-center gap-3">

          <button className="btn btn-outline-light position-relative">
            <i className="bi bi-bell-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </button>

          <div className="dropdown">

            <button
              className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <img
                src="https://ui-avatars.com/api/?name=Placement+Officer&background=0D6EFD&color=fff"
                width="40"
                height="40"
                className="rounded-circle"
                alt="Admin"
              />

              <div className="text-start">
                <div className="fw-semibold">{adminName}</div>
                <small className="text-muted">Administrator</small>
              </div>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li>
                <button className="dropdown-item hover-color" onClick={onProfile}>
                  <i className="bi bi-person me-2"></i>
                  My Profile
                </button>
              </li>

              <li>
                <button className="dropdown-item hover-color">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </button>
              </li>

              <li><hr className="dropdown-divider" /></li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={onLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>

          </div>

        </div>

    
  );
}

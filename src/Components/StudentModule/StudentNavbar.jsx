import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function StudentNavbar({
  studentName = "Student"
}) {
  const loc = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-100 d-flex justify-content-end align-items-center">

      {/* Left Menu */}
      <ul className="navbar-nav d-flex flex-row align-items-center gap-3 ">

        <li className="nav-item">
          <Link
            className={`nav-link ${
              loc.pathname.includes("dashboard") ? "active" : ""
            }`}
            to="/student/dashboard"
          >
            <i className="bi bi-speedometer2 me-1"></i>
            Dashboard
          </Link>
        </li>

        
                <li className="nav-item dropdown">
                  <button
                    className={`nav-link btn dropdown-toggle ${loc.pathname.includes("companies") ? "active" : ""}`}
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-briefcase-fill me-1"></i>
                       Companies
                  </button>
        
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item hover-bg-primary" to="/student/companies/companylist">Companies List</Link></li>
                    <li><Link className="dropdown-item hover-bg-primary" to="/student/companies/jobs">Jobs Openings</Link></li>
                  </ul>
                </li>


        <li className="nav-item">
          <Link
            className={`nav-link ${
              loc.pathname.includes("applications") ? "active" : ""
            }`}
            to="/student/applications"
          >
            <i className="bi bi-file-earmark-text me-1"></i>
            Applications
          </Link>
        </li>

         <li className="nav-item">
          <Link
            className={`nav-link ${
              loc.pathname.includes("interviews") ? "active" : ""
            }`}
            to="/student/interviews"
          >
            <i className="bi bi-file-earmark-text me-1"></i>
            Interviews
          </Link>
        </li>
      </ul>     

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3">

        {/* Notification */}
        <button className="btn btn-outline-light position-relative">
          <i className="bi bi-bell"></i>

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="dropdown">
          <button
            className="btn p-0 border-0 bg-transparent"
            data-bs-toggle="dropdown"
          >
            <div
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
              style={{
                width: "42px",
                height: "42px",
              }}
            >
              <i className="bi bi-person-fill fs-5"></i>
            </div>
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">

            <li className="dropdown-header fw-bold">
              {studentName}
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                className="dropdown-item hover-bg-primary"
                onClick={() => navigate("/student/profile")}
              >
                My Profile
              </button>
            </li>

            <li>
              <button
                className="dropdown-item hover-bg-primary"
                onClick={() => navigate("/student/applications")}
              >
                Applications
              </button>
            </li>

            <li>
              <button
                className="dropdown-item hover-bg-primary"
              >
                Settings
              </button>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  localStorage.removeItem("token");

                  setTimeout(() => {
                    alert("Logout Successfully");
                    navigate("/");
                  }, 500);
                }}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>

    </div>
  );
}
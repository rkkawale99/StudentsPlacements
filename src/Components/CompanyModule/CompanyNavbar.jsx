
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// onProfile and on Loguout
export default function CompanyNavbar({ companyName = "TechNova Pvt. Ltd." }) {
const loc = useLocation();
const navigate = useNavigate();



  return (


    <div className="ms-auto d-flex align-items-center gap-3">
      <ul className="navbar-nav ms-auto align-items-center">

        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname.includes("dashboard") ? "active" : ""}`} to="/company/dashboard">
            <i className="bi bi-speedometer2 me-1"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item dropdown">
          <button
            className={`nav-link btn dropdown-toggle ${loc.pathname.includes("jobs") ? "active" : ""}`}
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-briefcase-fill me-1"></i>
            Jobs
          </button>

          <ul className="dropdown-menu">
            <li><Link className="dropdown-item hover-bg-primary" to="/company/jobs/createJob">Create Job</Link></li>
            <li><Link className="dropdown-item hover-bg-primary" to="/company/jobs">Manage Jobs</Link></li>
            <li><Link className="dropdown-item hover-bg-primary" to="/company/jobs/applications">Applications</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <button
            className={`nav-link btn dropdown-toggle ${loc.pathname.includes("interview") ? "active" : ""}`}
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-calendar-check-fill me-1"></i>
            Interviews
          </button>

          <ul className="dropdown-menu">
            <li><Link className="dropdown-item hover-bg-primary" to="/company/interview/upcoming">UpComing Interviews</Link></li>
            <li><Link className="dropdown-item hover-bg-primary" to="/company/interview/interviewResults">Interview Result List</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <button
            className={`nav-link btn dropdown-toggle ${loc.pathname.includes("result") ? "active" : ""}`}
            data-bs-toggle="dropdown"
          >
            <i className="bi bi-award-fill me-1"></i>
            Results
          </button>

          <ul className="dropdown-menu">
            <li><Link className="dropdown-item hover-bg-primary" to="/company/result">Publish Result</Link></li>
            <li><Link className="dropdown-item hover-bg-primary" to="/company/result/publish">Offer Letters</Link></li>
          </ul>
        </li>

      </ul>
      <button className="btn btn-outline-light position-relative">
        <i className="bi bi-bell"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
      </button>

  <div className="dropdown">
  <button
    className="btn p-0 border-0 bg-transparent"
    data-bs-toggle="dropdown"
  >
    <div
      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
      style={{ width: "42px", height: "42px" }}
    >
      <i className="bi bi-building fs-5"></i>
    </div>
  </button>

  <ul className="dropdown-menu dropdown-menu-end shadow">
    <li className="dropdown-header fw-bold">{companyName}</li>

    <li><hr className="dropdown-divider" /></li>

    <li><button className="dropdown-item hover-bg-primary" onClick={()=>navigate("/company/profile")}>Profile</button></li>
    <li><button className="dropdown-item hover-bg-primary">Settings</button></li>

    <li><hr className="dropdown-divider" /></li>

    <li><button className="dropdown-item text-danger" onClick={()=>{
       localStorage.removeItem("token");
       setTimeout(() => {
        alert("Logout Successfully");
          navigate("/")
       }, 2000);

    }}>Logout</button></li>
  </ul>
</div>
    </div>


  );
}

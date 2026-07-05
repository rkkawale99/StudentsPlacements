import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();
  const stats = {
    eligible: 18,
    applied: 7,
    interviews: 3,
    offers: 1,
  };
  //Change info with API ****
  const upcomingDrives = [
    {
      company: "Google",
      role: "Software Engineer Intern",
      date: "10 July 2026",
    },
    {
      company: "TCS",
      role: "Java Full Stack Developer",
      date: "14 July 2026",
    },
    {
      company: "Infosys",
      role: "System Engineer",
      date: "20 July 2026",
    },
  ];

  const appliedCompanies = [
    "Google",
    "Accenture",
    "Infosys",
    "Capgemini",
    "TCS",
    "Wipro",
    "Cognizant",
  ];

  const interviewStatus = [
    {
      company: "Google",
      round: "Technical Round 1",
      status: "Scheduled",
    },
    {
      company: "Accenture",
      round: "HR Round",
      status: "Completed",
    },
    {
      company: "Infosys",
      round: "Coding Round",
      status: "Pending",
    },
  ];

  return (
    <div className="container-fluid p-4 bg-dark text-light min-vh-100">
      <div className="mb-4">
        {/* Change Name With API */}
        <h2 className="fw-bold">Welcome, Rushi 👋</h2>
        <p className="text-info">
          Track your placement journey and stay updated with upcoming drives.
        </p>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow border-0">
            <div className="card-body">
              <h5>Eligible Companies</h5>
              <h2>{stats.eligible}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow border-0">
            <div className="card-body">
              <h5>Applied</h5>
              <h2>{stats.applied}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow border-0">
            <div className="card-body">
              <h5>Interviews</h5>
              <h2>{stats.interviews}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white shadow border-0">
            <div className="card-body">
              <h5>Offers</h5>
              <h2>{stats.offers}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        {/* Upcoming Drives */}

        <div className="col-lg-6 mb-4">
          <div className="card bg-secondary bg-opacity-25 border-secondary">
            <div className="card-header fw-bold">
              Upcoming Placement Drives
            </div>

            <div className="card-body d-flex justify-content-center flex-column">

              {upcomingDrives.map((drive, index) => (
                <div
                  key={index}
                  className="border-bottom border-secondary py-2"
                >
                  <h6>{drive.company}</h6>
                  <small>{drive.role}</small>

                  <div className="text-info">
                    Drive Date : {drive.date}
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" onClick={()=>{navigate("/student/companylist")}}>View More</button>

            </div>
          </div>
        </div>

        {/* Applied Companies */}

        <div className="col-lg-6 mb-4">
          <div className="card bg-secondary bg-opacity-25 border-secondary">
            <div className="card-header fw-bold">
              Applied Companies
            </div>

            <div className="card-body">

              {appliedCompanies.map((company, index) => (
                <span
                  key={index}
                  className="badge bg-primary m-2 p-2"
                >
                  {company}
                </span>
              ))}

            </div>
          </div>
        </div>

      </div>

      {/* Interview Status */}

      <div className="card bg-secondary bg-opacity-25 border-secondary mb-4">
        <div className="card-header fw-bold">
          Interview Status
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0">
            <thead>
              <tr>
                <th>Company</th>
                <th>Round</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {interviewStatus.map((item, index) => (
                <tr key={index}>
                  <td>{item.company}</td>
                  <td>{item.round}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "Completed"
                          ? "bg-success"
                          : item.status === "Scheduled"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* Placement Progress */}

      <div className="card bg-secondary bg-opacity-25 border-secondary">
        <div className="card-header fw-bold">
          Placement Progress
        </div>

        <div className="card-body">

          <div className="mb-2">
            Profile Completion
          </div>

          <div className="progress mb-4">
            <div
              className="progress-bar bg-success"
              style={{ width: "80%" }}
            >
              80%
            </div>
          </div>

          <div className="mb-2">
            Placement Readiness
          </div>

          <div className="progress">
            <div
              className="progress-bar bg-info"
              style={{ width: "65%" }}
            >
              65%
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
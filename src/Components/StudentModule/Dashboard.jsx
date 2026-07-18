import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { useStudent } from "../Contexts/StudentContext";


const Dashboard = () => {

  const [search, setSearch] = useState("");
  let {student} = useStudent();
  const [dashboard, setDashboard] = useState({
    NoOfCom: 0,
    NoOfApp: 0,
    NoOfInterviews: 0,
    NoOfOffers: 0,
    jobs: [],
    companies: [],
    interviews: [],
    ProfileScore: 0,
    AllCompanies: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/students/dashboard");

      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

const filteredCompanies = dashboard.AllCompanies?.filter((company) =>
  company.companyName.toLowerCase().includes(search.toLowerCase()) ||
  (company.industry || "")
    .toLowerCase()
    .includes(search.toLowerCase()) ||
  (company.headOffice || "")
    .toLowerCase()
    .includes(search.toLowerCase())
);

  const navigate = useNavigate();
 

  const placementReadiness = Math.min(
    100,
    dashboard.ProfileScore +
    dashboard.NoOfApp * 5 +
    dashboard.NoOfInterviews * 10 +
    dashboard.NoOfOffers * 15
  );

  return (
    <div className="container-fluid p-4 bg text-light min-vh-100">
      <div className="position-relative mx-auto" style={{ width: "40%" }}>
        <input
          type="text"
          className="form-control bg-dark text-light border-secondary"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.trim() !== "" && (
          <div
            className="position-absolute w-100 bg-secondary rounded shadow mt-1"
            style={{
              zIndex: 1050,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {filteredCompanies.length === 0 ? (
              <h6 className="p-3 text-info mb-0">
                No Company Found
              </h6>
            ) : (
              filteredCompanies.map((company) => (
                <div
    key={company.id}
    className="p-3 border-bottom company-item"
    style={{ cursor: "pointer" }}
    onClick={() =>
        navigate("/student/companies/companylist", {
            state: company,
            from: "search"
        })
    }
>

    <div className="d-flex align-items-center">

        <img
            src={`data:image/jpeg;base64,${company.logo}`}
            alt={company.companyName}
            className="rounded-circle me-3"
            style={{
                width: 45,
                height: 45,
                objectFit: "cover"
            }}
        />

        <div className="flex-grow-1">

            <h6 className="mb-1 text-light">
                {company.companyName}
            </h6>

            <small className="text-muted d-block">
                {company.industry || "Industry Not Available"}
            </small>

            <small className="text-info">
                {company.headOffice}
            </small>

        </div>

    </div>

</div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="mb-4">
        {/* Change Name With API */}
        <h2 className="fw-bold">Welcome, {student?.firstName} 👋</h2>
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
              <h2>{dashboard.NoOfCom}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow border-0">
            <div className="card-body">
              <h5>Applied</h5>
              <h2>{dashboard.NoOfApp}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning text-dark shadow border-0">
            <div className="card-body">
              <h5>Interviews</h5>
              <h2>{dashboard.NoOfInterviews}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-info text-white shadow border-0">
            <div className="card-body">
              <h5>Offers</h5>
              <h2>{dashboard.NoOfOffers}</h2>
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

              {dashboard.jobs.map((job) => (
                <div
                  key={job.id}
                  className="border-bottom border-secondary py-2"
                >
                  <h6>{job.companyName}</h6>

                  <small>{job.jobRole}</small>

                  <div className="text-info">
                    Last Date : {job.registrationDeadline}
                  </div>

                  <div className="text-warning">
                    ₹ {job.salaryPackage} LPA
                  </div>
                </div>
              ))}
              <button className="btn btn-primary" onClick={() => { navigate("/student/companylist") }}>View More</button>

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

              {dashboard.companies.map((company, index) => (
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

              {dashboard.interviews.map((item) => (
                <tr key={item.id}>

                  <td>{item.jobRole}</td>

                  <td>{item.round || "-"}</td>

                  <td>
                    <span
                      className={`badge ${item.status === "COMPLETED"
                          ? "bg-success"
                          : item.status === "RESCHEDULED"
                            ? "bg-warning text-dark"
                            : item.status === "SCHEDULED"
                              ? "bg-primary"
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
              style={{ width: `${dashboard.ProfileScore}%` }}
            >
              {dashboard.ProfileScore}%
            </div>
          </div>

          <div className="mb-2">
            Placement Readiness
          </div>

          <div className="progress">
            <div
              className="progress-bar bg-info"
              style={{
                width: `${placementReadiness}%`,
              }}
            >
              {placementReadiness}%
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
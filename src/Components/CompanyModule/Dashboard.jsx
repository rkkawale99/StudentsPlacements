
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios";




export default function CompanyDashboard() {
  const [dashboard, setDashboard] = useState({
    NoOfDrives: 0,
    NoOfApp: 0,
    NoOfInterviews: 0,
    NoOfSelected: 0,
    jobs: [],
  });
  let stats = [
    {
      title: "Active Drives",
      value: dashboard.NoOfDrives,
      color: "primary",
    },
    {
      title: "Applications",
      value: dashboard.NoOfApp,
      color: "success",
    },
    {
      title: "Interviews",
      value: dashboard.NoOfInterviews,
      color: "warning",
    },
    {
      title: "Selected",
      value: dashboard.NoOfSelected,
      color: "info",
    },
  ]

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/companies/dashboard");
      setDashboard(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="container-fluid py-4 bg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-white mb-1">Company Dashboard</h2>
          <p className="text-light mb-0">Welcome back, HR Manager</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/company/jobs/createJob")}>+ Create Job</button>
      </div>

      <div className="row g-4">
        {stats.map((s) => (
          <div className="col-md-3" key={s.title}>
            <div className="card rounded-3 shadow border-0">
              <div className="card-body">
                <h6 className="text-muted">{s.title}</h6>
                <h2 className={`text-${s.color}`}>{s.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-header bg-dark fw-bold">Recent Job Drives</div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="light">
                  <tr>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Vacancies</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.jobs.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No Job Drives Available
                      </td>
                    </tr>
                  ) : (
                    dashboard.jobs.map((job) => (
                      <tr key={job.id}>
                        <td>{job.jobRole}</td>
                        <td>{job.location}</td>
                        <td>{job.vacancies}</td>
                        <td>
                          <span
                            className={`badge ${job.status === "OPEN"
                                ? "bg-success"
                                : job.status === "DRAFT"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-secondary fw-bold">Quick Actions</div>
            <div className="list-group list-group-flush">
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/company/jobs/createJob')}>Create New Job</button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/company/jobs/applications')}>View Applicants</button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/company/interview')}>Schedule Interviews</button>
              <button className="list-group-item list-group-item-action" onClick={() => navigate('/company/result')}>Upload Offer Letter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

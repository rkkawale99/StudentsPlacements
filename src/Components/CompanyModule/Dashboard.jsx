
import React from "react";


const stats = [
  { title: "Active Drives", value: 8, color: "primary" },
  { title: "Applications", value: 256, color: "success" },
  { title: "Interviews", value: 42, color: "warning" },
  { title: "Selected", value: 18, color: "info" },
];

const drives = [
  { role: "Java Full Stack Developer", location: "Pune", applicants: 96, status: "Open" },
  { role: "React Developer", location: "Mumbai", applicants: 58, status: "Open" },
  { role: "QA Engineer", location: "Bengaluru", applicants: 34, status: "Closing Soon" },
];

export default function CompanyDashboard() {
  return (
    <div className="container-fluid py-4 bg">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-white mb-1">Company Dashboard</h2>
          <p className="text-light mb-0">Welcome back, HR Manager</p>
        </div>
        <button className="btn btn-primary">+ Create Job</button>
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
                    <th>Applicants</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drives.map((d) => (
                    <tr key={d.role}>
                      <td>{d.role}</td>
                      <td>{d.location}</td>
                      <td>{d.applicants}</td>
                      <td>
                        <span className={`badge ${d.status==="Open"?"bg-success":"bg-warning text-dark"}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-secondary fw-bold">Quick Actions</div>
            <div className="list-group list-group-flush">
              <button className="list-group-item list-group-item-action">Create New Job</button>
              <button className="list-group-item list-group-item-action">View Applicants</button>
              <button className="list-group-item list-group-item-action">Schedule Interviews</button>
              <button className="list-group-item list-group-item-action">Upload Offer Letter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

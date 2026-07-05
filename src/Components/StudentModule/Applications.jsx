import React, { useState } from "react";
import ViewApplication from "./ViewApplication";

const Applications = () => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleView = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };
    const applications = [
        { company: "Google", role: "Software Engineer Intern", applied: "01 Jul 2026", status: "Interview Scheduled" },
        { company: "Microsoft", role: "SDE", applied: "28 Jun 2026", status: "Shortlisted" },
        { company: "TCS", role: "Java Full Stack Developer", applied: "25 Jun 2026", status: "Selected" },
        { company: "Infosys", role: "System Engineer", applied: "24 Jun 2026", status: "Rejected" },
        { company: "Accenture", role: "Associate Software Engineer", applied: "20 Jun 2026", status: "Applied" },
    ];

    const counts = {
        applied: applications.length,
        shortlisted: applications.filter(a => a.status === "Shortlisted").length,
        interview: applications.filter(a => a.status === "Interview Scheduled").length,
        selected: applications.filter(a => a.status === "Selected").length,
        rejected: applications.filter(a => a.status === "Rejected").length,
    };

    const badge = (status) => {
        switch (status) {
            case "Applied": return "secondary";
            case "Shortlisted": return "info";
            case "Interview Scheduled": return "warning";
            case "Selected": return "success";
            case "Rejected": return "danger";
            default: return "secondary";
        }
    };

    return (
        <div className="container py-4">
            <ViewApplication show={showModal} setShow={setShowModal} selectedApplication={selectedApplication}/>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Applications</h2>
                    <p className="text-muted mb-0">Track all your placement applications.</p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Applied</h6><h3>{counts.applied}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Shortlisted</h6><h3>{counts.shortlisted}</h3></div></div></div>
                <div className="col-md-3"><div className="card text-center shadow-sm"><div className="card-body"><h6>Interview Scheduled</h6><h3>{counts.interview}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Selected</h6><h3>{counts.selected}</h3></div></div></div>
                <div className="col-md-3"><div className="card text-center shadow-sm"><div className="card-body"><h6>Rejected</h6><h3>{counts.rejected}</h3></div></div></div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header fw-bold">Applied Companies</div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Applied On</th>
                                <th>Application Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={index} >
                                    <td className="text-light">{index + 1}</td>
                                    <td className="text-light">{app.company}</td>
                                    <td className="text-light">{app.role}</td>
                                    <td className="text-light">{app.applied}</td>
                                    <td className="text-light"><span className={`badge bg-${badge(app.status)}`}>{app.status}</span></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleView(app)}>
                                            View
                                        </button>
                                        <button className="btn btn-sm btn-outline-secondary">Withdraw</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Applications;

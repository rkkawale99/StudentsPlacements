import React, { useEffect, useState } from "react";
import ViewApplication from "./ViewApplication";
import { useStudent } from "../Contexts/StudentContext";
import api from "../../utils/axios";

const Applications = () => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [applications, setApplications] = useState([]);
    const { student } = useStudent();

    const handleView = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };
    useEffect(() => {
        if (student?.id) {
            loadApplications(student.id);
        }
    }, [student]);

    const loadApplications = async (studentId) => {
        try {
            const res = await api.get(`/applications/student/${studentId}`);
            setApplications(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    const changeStatus = async (id, status) => {
        try {
            await api.put(`/applications/${id}/status?status=${status}`);

            setApplications(prev =>
                prev.map(app =>
                    app.id === id
                        ? { ...app, status }
                        : app
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    const counts = {
        applied: applications.length,
        shortlisted: applications.filter(a => a.status === "SHORTLISTED").length,
        interview: applications.filter(a => a.status === "INTERVIEW_SCHEDULED").length,
        selected: applications.filter(a => a.status === "SELECTED").length,
        rejected: applications.filter(a => a.status === "REJECTED").length,
        confirm: applications.filter(a => a.status === "CONFIRM").length,
    };

    const badge = (status) => {
        switch (status) {
            case "APPLIED":
                return "secondary";

            case "SHORTLISTED":
                return "info";

            case "INTERVIEW_SCHEDULED":
                return "warning";

            case "SELECTED":
                return "success";

            case "REJECTED":
                return "danger";

            case "CONFIRM":
                return "primary";

            default:
                return "secondary";
        }
    };

    return (
        <div className="container py-4">
            <ViewApplication show={showModal} setShow={setShowModal} selectedApplication={selectedApplication} />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold">Applications</h2>
                    <p className="text-muted mb-0">Track all your placement applications.</p>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Applied</h6><h3>{counts.applied}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Shortlisted</h6><h3>{counts.shortlisted}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Interview Scheduled</h6><h3>{counts.interview}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Selected</h6><h3>{counts.selected}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Rejected</h6><h3>{counts.rejected}</h3></div></div></div>
                <div className="col-md-2"><div className="card text-center shadow-sm"><div className="card-body"><h6>Confirm</h6><h3>{counts.confirm}</h3></div></div></div>
            </div>

            <div className="card shadow-sm">
                <div className="card-header fw-bold">Applied Companies</div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table table-hover application-table">
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
                                <tr key={app.id}>
                                    <td>{index + 1}</td>

                                    <td>{app.companyName}</td>

                                    <td>{app.jobRole}</td>

                                    <td>
                                        {new Date(app.appliedDate).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <span className={`badge bg-${badge(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>

                                    <td className="d-flex gap-2">

                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleView(app)}
                                        >
                                            View
                                        </button>


                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => changeStatus(app.id, "WITHDRAWN")}
                                        >
                                            Withdraw
                                        </button>



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

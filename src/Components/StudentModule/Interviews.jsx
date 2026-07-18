import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useStudent } from "../Contexts/StudentContext"; 

const Interviews = () => {
    const { student } = useStudent();

    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (student?.id) {
            loadInterviews(student.id);
        }
    }, [student]);

    const loadInterviews = async (studentId) => {
        try {
            const res = await api.get(`/interviews/student/${studentId}`);
            setInterviews(res.data.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const upcoming = interviews.filter(
        (i) => i.status !== "COMPLETED"
    );

    const past = interviews.filter(
        (i) => i.status === "COMPLETED"
    );

    const badgeColor = (status) => {
        switch (status) {
            case "SCHEDULED":
                return "primary";

            case "RESCHEDULED":
                return "warning";

            case "COMPLETED":
                return "success";

            case "CANCELLED":
                return "danger";

            default:
                return "secondary";
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="container py-4">

            <div className="mb-4">
                <h2 className="fw-bold">My Interviews</h2>
                <p className="text-muted">
                    View your upcoming and completed interviews.
                </p>
            </div>

            {/* Upcoming Interviews */}

            <div className="mb-5">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold text-primary">
                        Upcoming Interviews
                    </h4>

                    <span className="badge bg-primary fs-6">
                        {upcoming.length}
                    </span>
                </div>

                {upcoming.length === 0 ? (
                    <div className="alert alert-info">
                        No Upcoming Interviews
                    </div>
                ) : (
                    <div className="row g-4">
                        {upcoming.map((item) => (
                            <div
                                className="col"
                                key={item.id}
                            >
                                <div className="card shadow-sm border-0 h-100">

                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">

                                            <div>
                                                <h5 className="fw-bold">
                                                    {item.jobRole}
                                                </h5>

                                                <p className="text-muted mb-0">
                                                    {item.fullName}
                                                </p>
                                            </div>

                                           <div>
                                             <span
                                                className={`badge bg-${badgeColor(
                                                    item.status
                                                )} text-center`}
                                            >
                                                {item.status}
                                            </span>
                                           </div>

                                        </div>

                                        <hr />

                                        <div className="row">

                                            <div className="col-6 mb-3">
                                                <strong>Date</strong>
                                                <br />
                                                {item.interviewDate}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Mode</strong>
                                                <br />
                                                {item.mode}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Venue</strong>
                                                <br />
                                                {item.venue || "-"}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Round</strong>
                                                <br />
                                                {item.round || "-"}
                                            </div>

                                              <div className="col-12 mb-3">
    <strong>Meeting Link</strong>
    <br />

    {item.meetingLink ? (
        <div className="input-group mt-2">

            <input
                type="text"
                className="form-control"
                value={item.meetingLink}
                readOnly
            />

            <button
                className="btn btn-outline-secondary"
                onClick={() => {
                    navigator.clipboard.writeText(item.meetingLink);
                    alert("Meeting link copied!");
                }}
            >
                <i className="bi bi-clipboard me-1"></i>
                Copy
            </button>

            <a
                href={item.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
            >
                <i className="bi bi-box-arrow-up-right me-1"></i>
                Open
            </a>

        </div>
    ) : (
        <span className="text-muted">-</span>
    )}
</div>

                                        </div>

                                        {item.mode === "ONLINE" &&
                                            item.meetingLink && (
                                                <a
                                                    href={item.meetingLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-primary w-100"
                                                >
                                                    Join Meeting
                                                </a>
                                            )}

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Past Interviews */}

            <div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold text-success">
                        Past Interviews
                    </h4>

                    <span className="badge bg-success fs-6">
                        {past.length}
                    </span>
                </div>

                {past.length === 0 ? (
                    <div className="alert alert-secondary">
                        No Past Interviews
                    </div>
                ) : (
                    <div className="row g-4">

                        {past.map((item) => (
                            <div
                                className="col-lg-6"
                                key={item.id}
                            >
                                <div className="card shadow-sm border-0">

                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">

                                            <div>
                                                <h5 className="fw-bold">
                                                    {item.jobRole}
                                                </h5>

                                                <p className="text-muted mb-0">
                                                    {item.fullName}
                                                </p>
                                            </div>

                                            <div><span className="badge bg-success">
                                                COMPLETED
                                            </span></div>

                                        </div>

                                        <hr />

                                        <div className="row">

                                            <div className="col-6 mb-3">
                                                <strong>Date</strong>
                                                <br />
                                                {item.interviewDate}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Mode</strong>
                                                <br />
                                                {item.mode}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Venue</strong>
                                                <br />
                                                {item.venue || "-"}
                                            </div>

                                            <div className="col-6 mb-3">
                                                <strong>Application Status</strong>
                                                <br />
                                                {item.appStatus}
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
};

export default Interviews;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/axios";

export default function ScheduleInterview() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const applications = state?.applications || [];
    console.log(applications);


    const [form, setForm] = useState({
        interviewDate: "",
        mode: "ONLINE",
        meetingLink: "",
        venue: "",
        status : "",
        round: ""
    });

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            await Promise.all(

                applications.map(app =>
                    api.post(
                        "/interviews",
                        {
                            application: { id: app.id },
                            interviewDate: form.interviewDate,
                            mode: form.mode,
                            status: form.status,
                            meetingLink: form.meetingLink || null,
                            venue: form.venue || null,
                            round: form.round || null
                        }
                    )

                )

            );
              // Update application status
        await Promise.all(
            applications.map(app =>
                api.put(
                    `/applications/${app.id}/status?status=INTERVIEW_SCHEDULED`
                )
            )
        );

            alert("Interviews scheduled successfully.");

            navigate(-1);

        } catch (err) {

            console.error(err);

            alert("Failed to schedule interviews.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header">

                    <h4>Schedule Interview</h4>

                </div>

                <div className="card-body">

                    <h6>Selected Candidates</h6>

                    <ul className="list-group mb-4">

                        {applications.filter(app=> app.status == "SHORTLISTED")
                        .map(app => (

                            <li
                                key={app.id}
                                className="list-group-item"
                            >
                                {app.firstName}{" "}
                                {app.lastName}
                            </li>

                        ))}

                    </ul>

                    <form onSubmit={submit}>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <input
                                    type="date"
                                    className="form-control"
                                    name="interviewDate"
                                    value={form.interviewDate}
                                    onChange={change}
                                    required
                                />

                            </div>

                            <div className="col-md-6">

                                <select
                                    className="form-select"
                                    name="mode"
                                    value={form.mode}
                                    onChange={change}
                                >
                                    <option>ONLINE</option>
                                    <option>OFFLINE</option>
                                </select>

                            </div>

                            <div className="col-md-6">

                                <input
                                    className="form-control"
                                    placeholder="Meeting Link"
                                    name="meetingLink"
                                    value={form.meetingLink}
                                    onChange={change}
                                />

                            </div>

                            <div className="col-md-6">

                                <input
                                    className="form-control"
                                    placeholder="Venue"
                                    name="venue"
                                    value={form.venue}
                                    onChange={change}
                                />

                            </div>
                            <div className="col-md-6">
                                <select
                                    className="form-select"
                                    name="status"
                                    value={form.status}
                                    onChange={change}
                                >
                                    <option value="SCHEDULED">SCHEDULED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                    <option value="RESCHEDULED">RESCHEDULED</option>
                                </select>
                            </div>

                            <div className="col-md-6">

                                <input
                                    className="form-control"
                                    placeholder="Round"
                                    name="round"
                                    value={form.round}
                                    onChange={change}
                                />

                            </div>

                            <div className="col-md-12">

                                <button className="btn btn-primary">

                                    Schedule {applications.length} Interview
                                    {applications.length > 1 ? "s" : ""}

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";

export default function Shortlisting() {

    const [applications, setApplications] = useState([]);
    const [selected, setSelected] = useState([]);
    const loc = useLocation();
    let jobid = loc.state.jobid;
    const navigate = useNavigate();
    console.log(jobid);
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        const res = await api.get(`/applications/job/${jobid}`);

        setApplications(res.data.data);
    };

    const smartSort = async () => {

     const res = await api.get(`/applications/job/sorted/${jobid}`);


        setApplications(res.data.data);
    };

    const toggle = (id) => {

        if (selected.includes(id)) {
            setSelected(selected.filter(x => x !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const scheduleInterview = async () => {

        console.log(selected);

        // POST selected application ids
        // /api/interviews/schedule
        const selectedApplications = applications.filter(app =>
        selected.includes(app.id));
     // Update application status
        await Promise.all(
            selectedApplications.map(app =>
                api.put(
                    `/applications/${app.id}/status?status=SHORTLISTED`
                )
            )
        );
         // Update status locally before navigation
    const updatedApplications = selectedApplications.map(app => ({
        ...app,
        status: "SHORTLISTED"
    }));
       

    navigate("/company/interview", {
        state: {
            applications: updatedApplications
        }
    });

    };

    return (
        <div className="container py-4">

            <div className="card shadow">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h4>Applications</h4>

                    <button
                        className="btn btn-primary"
                        onClick={smartSort}
                    >
                        Smart Sort
                    </button>

                </div>

                <div className="card-body">

                    <table className="table">

                        <thead>

                        <tr>

                            <th></th>
                            <th>Name</th>
                            <th>CGPA</th>
                            <th>Score</th>
                            <th>Status</th>

                        </tr>

                        </thead>

                        <tbody>

                        {applications.filter(app => app.status === "APPLIED")
                        .map(app =>{ 
                          
                            return (
                            

                            <tr key={app.id}>

                                <td>

                                    <input
                                        type="checkbox"
                                        checked={selected.includes(app.id)}
                                        onChange={() => toggle(app.id)}
                                    />

                                </td>
                                <td>

                                    {app.firstName}
                                    {" "}
                                    {app.lastName}

                                </td>

                                <td>

                                    {app.cgpa}

                                </td>

                                <td>

                                    {app.score}

                                </td>

                                <td>

                                    {app.status}

                                </td>

                            </tr>

                        )})}

                        </tbody>

                    </table>

                    <button
                        className="btn btn-success"
                        disabled={selected.length === 0}
                        onClick={scheduleInterview}
                    >
                        Schedule Interview ({selected.length})
                    </button>

                </div>

            </div>

        </div>
    );
}
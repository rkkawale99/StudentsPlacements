import React, { useEffect, useState } from "react";
import api from "../../../utils/axios";
import Spinner from "../../CommonComp/Spinner";


const InterviewResults = () => {

      const [interviews, setInterviews] = useState([]);
      const [loading, setLoading] = useState(false)

       useEffect(() => {
    loadInterviews();
  }, []);

  
  const loadInterviews = async () => {
    try {
      setLoading(true);

      const res = await api.get("/interviews/company");

      setInterviews(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Unable to load interviews");
    } finally {
      setLoading(false);
    }
  };


  const updateStatus = async (id, status) => {

     try {
      setLoading(true);

      const res = await api.put(`/applications/${id}/status?status=${status}`);
     setInterviews((prev) =>
      prev.filter((item) =>item.id !== id ));
    } catch (err) {
      console.error(err);
      alert("Unable to load interviews");
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="container py-4">
      <h2 className="mb-4">Interview List</h2>
       {loading ? <Spinner/> : 
      <div className="row gap-4">

      {interviews.filter(i=>i.appStatus === "INTERVIEW_SCHEDULED")
      .map((interview) => (
       
        <div key={interview.id} className="col-md-3 card mb-3 bg-secondary shadow-sm">
          <div className="card-body">
            <h5>{interview.company}</h5>

            <p className="mb-1">
              <strong>Role:</strong> {interview.jobRole}
            </p>

            <p className="mb-1">
              <strong>Name:</strong> {interview.fullName}
            </p>

            <p className="mb-1">
              <strong>Date:</strong> {interview.date}
            </p>

            <p className="mb-2">
              <strong>Time:</strong> {interview.time}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  interview.status === "ACCEPTED"
                    ? "text-success"
                    : interview.status === "REJECTED"
                    ? "text-danger"
                    : "text-warning"
                }
              >
                {interview.status}
              </span>
            </p>

            <button
              className="btn btn-success me-2"
              disabled={interview.status !== "COMPLETED"}
              onClick={() => updateStatus(interview.applicationId, "SELECTED")}
            >
              Accept
            </button>

            <button
              className="btn btn-danger"
              disabled={interview.status !== "COMPLETED"}
              onClick={() => updateStatus(interview.applicationId, "REJECTED")}
            >
              Reject
            </button>
          </div>
        </div>
   
      ))}
      
      </div>}
    </div>
  );
};

export default InterviewResults;
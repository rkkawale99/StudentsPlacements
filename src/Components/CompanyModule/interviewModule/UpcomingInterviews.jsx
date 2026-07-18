import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/axios";
import InterviewStats from "./InterviewStats";
import InterviewFilter from "./InterviewFilter";


export default function UpcomingInterviews() {
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   const [interviews, setInterviews] = useState([]);

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

     const updateStatus = async (interview, status) => {
    try {
      await api.put(  
        `/interviews/${interview.id}/status?status=${status}`
      );

      if (status === "RESCHEDULED") {
        navigate("/company/interview", {
          state: {
            applications: [
              {
                id: interview.applicationId,
              },
            ],
          },
        });

        return;
      }

      setInterviews((prev) =>
        prev.map((item) =>
          item.id === interview.id
            ? { ...item, status }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update interview status.");
    }
  };
  

  return (
    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3 className="fw-bold">
          Upcoming Interviews
        </h3>

        <button
          className="btn btn-outline-primary"
          onClick={loadInterviews}
        >
          Refresh
        </button>

      </div>

      {/* Statistics */}
      <InterviewStats interviews={interviews}/>

      {/* Filters */}

      <InterviewFilter interviews={interviews} loading={loading} updateStatus={updateStatus}/>
      {/* Table */}

      

     

    </div>
  );
}

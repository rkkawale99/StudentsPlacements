import React, { useEffect, useState } from "react";
import api from "../../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudent } from "../../Contexts/StudentContext";

const ManageJobs1 = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const {student} = useStudent();

  const navigate = useNavigate();
  const loc = useLocation();
  const { mode, companyName } = loc.state || {};

  const filteredJobs =
  mode !== null && mode === "list" 
    ? jobs.filter(j => j.companyName === companyName)
    : jobs;

  useEffect(() => {
     let studentId =  student?.id;
    if(studentId) loadJobs(studentId);
  }, [student]);

  const loadJobs = async (studentId) => {
    try {      
      const res = await api.get(`/jobs/student/${studentId}`);
      console.log(res.data.message);
      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Available Jobs</h2>
          <p className="text-muted mb-0">
            Browse available placement opportunities.
          </p>
        </div>
      </div>

      <div className="row g-4">

        {filteredJobs.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No Jobs Available
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div className="col-lg-6" key={job.id}>
              <div className="card shadow-sm border-0 h-100">

                <div className="card-body d-flex flex-column">

                  <div className="d-flex justify-content-between align-items-start">

                    <div>
                      <h4 className="fw-bold">
                        {job.companyName}
                      </h4>

                      <h6 className="text-primary">
                        {job.jobRole}
                      </h6>
                    </div>

                    <span
                      className={`badge ${
                        job.status === "OPEN"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>

                  </div>

                  <hr />

                  <div className="row small">

                    <div className="col-6 mb-2">
                      <strong>Package</strong>
                      <br />
                      ₹ {job.salaryPackage} LPA
                    </div>

                    <div className="col-6 mb-2">
                      <strong>Location</strong>
                      <br />
                      {job.location}
                    </div>

                    <div className="col-6 mb-2">
                      <strong>Vacancies</strong>
                      <br />
                      {job.vacancies}
                    </div>

                    <div className="col-6 mb-2">
                      <strong>Last Date</strong>
                      <br />
                      {job.registrationDeadline}
                    </div>

                  </div>

                  <div className="mt-auto">

                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        navigate(`/student/companies/jobs/${job.id}`, {
                          state: job,
                        })
                      }
                    >
                      <i className="bi bi-eye me-2"></i>
                      View
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ManageJobs1;
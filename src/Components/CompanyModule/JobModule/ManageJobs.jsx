import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import Top from "../../Popups/Top";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [show, setshow] = useState(false)
    const [pop, setPop] = useState({
      title : "",
      msg : ""
    })

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/jobs/company");
      setJobs(res.data.data || []);
    } catch (err) {
      console.error(err);
       setshow(true)
      setPop({title:"Job Creation", msg:err.response.data.message})
    } finally {
      setTimeout(() => {
        setshow(false);
      }, 2000);
      setLoading(false);
    }
  };
//delet job
const deleteJob = async (id) => {
  try {
    setLoading(true)
    await api.delete(`/jobs/${id}`);

    setJobs((prev) => prev.filter((job) => job.id !== id));
  } catch (err) {
    console.error(err);
     setshow(true)
      setPop({title:"Job Creation", msg:err.response.data.message})
  }finally{
    setTimeout(() => {
        setshow(false);
      }, 2000);
      setLoading(false);
  }
};

//Change Status
 const changeStatus = async (jobId, status) => {
    try {
      setLoading(true)
      const res = await api.put(`/jobs/${jobId}/status?jobStatus=${status}`);
     setJobs((prevJobs) =>prevJobs.map((job) =>job.id === jobId ? { ...job, status }: job));
    } catch (err) {
      console.error(err);
       setshow(true)
      setPop({title:"Job Creation", msg:err.response.data.message})
    } finally {
       setTimeout(() => {
        setshow(false);
      }, 2000);
      setLoading(false);
    }
  };


  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container py-4">
      <Top show={show} setShow={setshow} title={pop.title} msg={pop.msg}/>
      <div className="d-flex justify-content-between align-items-center mb-4">
        
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-briefcase-fill text-primary me-2"></i>
            Manage Jobs
          </h2>

          <p className="text-muted mb-0">
            Create, edit and manage your recruitment drives.
          </p>
        </div>

        <button className="btn btn-primary" onClick={()=>navigate("/company/jobs/createJob")}>
          <i className="bi bi-plus-circle me-2"></i>
          Create Job
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="card border-0 shadow text-center py-5">
          <i className="bi bi-folder2-open fs-1 text-secondary"></i>
          <h5 className="mt-3">No Jobs Found</h5>
        </div>
      ) : (
        <div className="row g-4 ">

          {jobs.map((job) => (

            <div className="col-lg-12 " key={job.id}>

              <div className="card border-0 shadow rounded-4 h-100 bg-secondary">

                <div className="card-body ">

                  <div className="d-flex justify-content-between">

                    <div>
                      <h4 className="fw-bold">
                        {job.jobRole}
                      </h4>

                      <p className="text-muted mb-2">
                        <i className="bi bi-building me-2"></i>
                        {job.companyName}
                      </p>
                    </div>

                   <div className="d-flex align-items-center"> <span
                      className={`badge text-center fs-6 ${
                        job.status === "OPEN"
                          ? "bg-success"
                          : job.status === "CLOSE" ? "bg-danger" : "bg-warning"
                      }`}
                    >
                      {job.status}
                    </span></div>

                  </div>

                  <hr />

                  <div className="row">

                    <div className="col-6 mb-3">
                      <small className="text-muted">
                        <i className="bi bi-currency-rupee me-1"></i>
                        Package
                      </small>

                      <div className="fw-semibold">
                        {job.salaryPackage} LPA
                      </div>
                    </div>

                    <div className="col-6 mb-3">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        Location
                      </small>

                      <div className="fw-semibold">
                        {job.location}
                      </div>
                    </div>

                 

                    <div className="col-6 mb-3">
                      <small className="text-muted">
                        <i className="bi bi-person-workspace me-1"></i>
                        Vacancies
                      </small>

                      <div className="fw-semibold">
                        {job.vacancies}
                      </div>
                    </div>

                    <div className="col-6">
                      <small className="text-muted">
                        <i className="bi bi-calendar-event me-1"></i>
                        Deadline
                      </small>

                      <div className="fw-semibold">
                        {job.registrationDeadline}
                      </div>
                    </div>

                  

                  </div>

                </div>

                <div className="card-footer bg-secondary border-0">

                  <div className="d-flex justify-content-between">

                    <div>
                      {/* edit */}
                      <button className="btn btn-primary btn-sm me-2" onClick={()=> navigate("/company/jobs/createJob",{state : {job, mode : "edit"}})}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
{/* delete */}
                      <button className="btn btn-danger btn-sm" onClick={()=> deleteJob(job.id)}>
                        <i className="bi bi-trash"></i>
                      </button>

                    </div>
                    <button className="btn btn-primary" onClick={()=> navigate("/company/shortlisting", {state : {jobid : job.id}})}>View Applications</button>

                    <div className="dropdown">

                      <button
                        className="btn btn-info btn-sm dropdown-toggle"
                        data-bs-toggle="dropdown"
                      >
                        Change Status
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end ">

                        <li>
                          <button className="dropdown-item hover-bg-primary" onClick={()=> changeStatus(job.id, "OPEN")}>
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Open
                          </button>
                        </li>

                        <li>
                          <button className="dropdown-item hover-bg-primary" onClick={()=> changeStatus(job.id, "DRAFT")}>
                            <i className="bi bi-pause-circle text-warning me-2"></i>
                            Draft
                          </button>
                        </li>

                        <li>
                          <button className="dropdown-item hover-bg-primary" onClick={()=> changeStatus(job.id, "CLOSE")}>
                            <i className="bi bi-x-circle text-danger me-2"></i>
                            Close
                          </button>
                        </li>

                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default ManageJobs;
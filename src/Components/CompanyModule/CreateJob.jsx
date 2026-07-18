
import React, { useState } from "react";
import Top from "../Popups/Top";
import api from "../../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateJob() {
   const [show, setshow] = useState(false)
const initialForm = {
  jobRole: "",
  description: "",
  salaryPackage: "",
  location: "",
  minCgpa: "",
  maxBacklogs: "",
  passingYear: "",
  registrationDeadline: "",
  interviewDate: "",
  vacancies : "",
  status: "OPEN"
};

  
  const [pop, setPop] = useState({
    title : "",
    msg : ""
  })
  const loc = useLocation();
  const job = loc.state?.job;
  const mode = loc.state?.mode;
  const [form, setForm] = useState(mode === "edit" ? job : initialForm);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


    const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const payload = {
      ...form,
      salaryPackage: form.salaryPackage ? Number(form.salaryPackage) : null,
      minCgpa: form.minCgpa ? Number(form.minCgpa) : null,
      maxBacklogs: form.maxBacklogs ? Number(form.maxBacklogs) : null,
      passingYear: form.passingYear ? Number(form.passingYear) : null,
      vacancies: form.vacancies ? Number(form.vacancies) : null,
    };

    if(mode === "edit"){
        try {
      let res = await api.put(`/jobs/${job.id}`,payload);
      setshow(true)
      setPop({title:"Job Updation", msg: res.data?.message})

    } catch (error) {
      setshow(true)
      setPop({title:"Job Updation", msg:error.response.data.message})
      
    }finally{
      setTimeout(() => {
        setshow(false);
        navigate("/company/jobs")
      }, 2000);
    }
    }
else{
    try {
      await api.post("/jobs",payload);
      setshow(true)
      setPop({title:"Job Creation", msg:"Job Created/posted Successfully"})

    } catch (error) {
      setshow(true)
      setPop({title:"Job Creation", msg:error.response.data.message})
      
    }finally{
      setTimeout(() => {
        setshow(false);
        navigate("/company/jobs")
      }, 2000);
    }
  }
};


  return (
    <div className="container py-4">
      <div className="card shadow border-0 rounded-4">
<Top show={show} setShow={setshow} title={pop.title} msg={pop.msg}/>
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">{mode === "edit" ? "Update" : "Create"} Job</h3>
        </div>

        <div className="card-body">
     <form onSubmit={handleSubmit}>
  <div className="row g-3">

    <div className="col-md-6">
      <label className="form-label">Job Role</label>
      <input
        type="text"
        className="form-control"
        name="jobRole"
        value={form.jobRole}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Salary Package (LPA)</label>
      <input
        type="number"
        step="0.01"
        className="form-control"
        name="salaryPackage"
        value={form.salaryPackage}
        min={0}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Location</label>
      <input
        type="text"
        className="form-control"
        name="location"
        value={form.location}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Vacancies</label>
      <input
        type="number"
        className="form-control"
        name="vacancies"
        min={0}
        value={form.vacancies}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Minimum CGPA</label>
      <input
        type="number"
        step="0.01"
        className="form-control"
        name="minCgpa"
        min={0}
        value={form.minCgpa}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Maximum Backlogs</label>
      <input
        type="number"
        className="form-control"
        name="maxBacklogs"
        min={0}
        value={form.maxBacklogs}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-4">
      <label className="form-label">Passing Year</label>
      <input
        type="number"
        className="form-control"
        name="passingYear"
        min={new Date().getFullYear() - 10}
        max={new Date().getFullYear() + 10}
        value={form.passingYear}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Registration Deadline</label>
      <input
        type="date"
        className="form-control"
        name="registrationDeadline"
        min={new Date().toISOString().split("T")[0]}
        value={form.registrationDeadline}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Interview Date</label>
      <input
        type="date"
        className="form-control"
        name="interviewDate"
        min={new Date().toISOString().split("T")[0]}
        value={form.interviewDate}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Status</label>
      <select
        className="form-select"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="OPEN">OPEN</option>
        <option value="CLOSED">CLOSED</option>
        <option value="DRAFT">DRAFT</option>
      </select>
    </div>

    <div className="col-12">
      <label className="form-label">Job Description</label>
      <textarea
        rows="5"
        className="form-control"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
    </div>

    <div className="col-12 d-flex justify-content-end gap-2 mt-3">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={() => setForm(initialForm)}
      >
        Reset
      </button>

      <button type="submit" className="btn btn-primary">
        {mode === "edit" ? "Update" : "Create"} Job
      </button>
    </div>

  </div>
</form>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from "react";
import Top from "../Popups/Top";

export default function CreateJob() {
   const [show, setshow] = useState(false)
  const initialForm = {
    title: "",
    department: "",
    employmentType: "Full Time",
    experience: "0-2 Years",
    package: "",
    location: "",
    vacancies: "",
    lastDate: "",
    skills: "",
    description: "",
    eligibility: ""
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setshow(true);
    setForm(initialForm);
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0 rounded-4">
<Top show={show} setShow={setshow} title="Job Creation" msg="Job Created/posted Successfully"/>
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Create Job</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Employment Type</label>
                <select
                  className="form-select"
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                >
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Experience</label>
                <select
                  className="form-select"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                >
                  <option>0-2 Years</option>
                  <option>2-5 Years</option>
                  <option>5+ Years</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Package (LPA)</label>
                <input
                  type="number"
                  className="form-control"
                  name="package"
                  value={form.package}
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
                  value={form.vacancies}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="lastDate"
                  value={form.lastDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Skills Required</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="React, Java, Spring Boot, SQL"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Eligibility Criteria</label>
                <textarea
                  rows="3"
                  className="form-control"
                  name="eligibility"
                  value={form.eligibility}
                  onChange={handleChange}
                />
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
                  Create Job
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

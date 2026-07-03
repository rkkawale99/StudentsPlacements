import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
    validateEmail,
    validateMobile,
    validatePassword
} from "../../utils/Authentication";
import Top from "../Popups/Top";

const StudentSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false)
  const [error, seterror] = useState("")

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    studentId: "",
    phone: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     if (!validateEmail(form.email)) {
        seterror("Invalid Email");
        setShow(true);
        return;
    }

    if (!validateMobile(form.phone)) {
        seterror("Invalid Mobile Number");
        setShow(true);
        return;
    }

    if (!validatePassword(form.password)) {
        seterror("Password must contain uppercase, lowercase, number and special character.");
        setShow(true);
        return;
    }
    //signup logic*****
    console.log(form);
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="row justify-content-center">
           
             <Top
        show={show}
        setShow={setShow}
        title={"Login Form"}
        msg={error}
        />
       
          <div className="col-lg-7 col-xl-8">
            <div className="card bg-secondary border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div
                    className="bg-primary bg-opacity-25 rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                    style={{ width: 72, height: 72 }}
                  >
                    <i className="bi bi-person-plus-fill fs-2 text-primary"></i>
                  </div>

                  <h2 className="text-light fw-bold">Student Registration</h2>
                  <p className="text-light opacity-75">
                    Create your placement portal account
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="form-label text-light">Full Name</label>
                      <input
                        className="form-control bg-dark text-light border-secondary"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Email</label>
                      <input
                        type="email"
                        className="form-control bg-dark text-light border-secondary"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Student ID / PRN</label>
                      <input
                        className="form-control bg-dark text-light border-secondary"
                        name="studentId"
                        value={form.studentId}
                        onChange={handleChange}
                        placeholder="Student ID"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Phone</label>
                      <input
                        className="form-control bg-dark text-light border-secondary"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Department</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Department</option>
                        <option>CSE</option>
                        <option>IT</option>
                        <option>AI & DS</option>
                        <option>ENTC</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Year</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Year</option>
                        <option>First</option>
                        <option>Second</option>
                        <option>Third</option>
                        <option>Final</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control bg-dark text-light border-secondary"
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          required
                        />
                        <button type="button" className="btn btn-dark border-secondary" onClick={()=>setShowPassword(!showPassword)}>
                          <i className={`bi ${showPassword?"bi-eye-slash":"bi-eye"}`}></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Confirm Password</label>
                      <div className="input-group">
                        <input
                          type={showConfirm ? "text" : "password"}
                          className="form-control bg-dark text-light border-secondary"
                          name="confirmPassword"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button type="button" className="btn btn-dark border-secondary" onClick={()=>setShowConfirm(!showConfirm)}>
                          <i className={`bi ${showConfirm?"bi-eye-slash":"bi-eye"}`}></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="agree"
                          name="agree"
                          checked={form.agree}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="agree" className="form-check-label text-light">
                          I agree to the Terms & Conditions
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-2 fw-semibold">
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Create Account
                      </button>
                    </div>

                    <div className="col-12 text-center">
                      <span className="text-light opacity-75">
                        Already have an account?
                      </span>{" "}
                      <a href="/login" className="text-primary text-decoration-none fw-semibold">
                        Sign In
                      </a>
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignup;

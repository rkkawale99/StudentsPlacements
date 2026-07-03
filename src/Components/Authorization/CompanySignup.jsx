import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const CompanySignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    hrName: "",
    phone: "",
    website: "",
    industry: "",
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
    console.log(form);
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-6">
            <div className="card bg-secondary border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <div
                    className="bg-primary bg-opacity-25 rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                    style={{ width: 72, height: 72 }}
                  >
                    <i className="bi bi-buildings-fill fs-2 text-primary"></i>
                  </div>

                  <h2 className="fw-bold text-light">Company Registration</h2>
                  <p className="text-light opacity-75">
                    Register your company to hire talented students.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-md-6">
                      <label className="form-label text-light">Company Name</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Company Email</label>
                      <input
                        type="email"
                        className="form-control bg-dark text-light border-secondary"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="company@example.com"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">HR Name</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        name="hrName"
                        value={form.hrName}
                        onChange={handleChange}
                        placeholder="HR Manager"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control bg-dark text-light border-secondary"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Website</label>
                      <input
                        type="url"
                        className="form-control bg-dark text-light border-secondary"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label text-light">Industry</label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        name="industry"
                        value={form.industry}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Industry</option>
                        <option>Information Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Manufacturing</option>
                        <option>Education</option>
                        <option>Other</option>
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
                        <button
                          type="button"
                          className="btn btn-dark border-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
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
                        <button
                          type="button"
                          className="btn btn-dark border-secondary"
                          onClick={() => setShowConfirm(!showConfirm)}
                        >
                          <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agree"
                          name="agree"
                          checked={form.agree}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label text-light" htmlFor="agree">
                          I agree to the Terms & Conditions
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                        <i className="bi bi-building-add me-2"></i>
                        Register Company
                      </button>
                    </div>

                    <div className="col-12 text-center">
                      <span className="text-light opacity-75">
                        Already registered?
                      </span>{" "}
                      <a href="/company-login" className="text-primary text-decoration-none fw-semibold">
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

export default CompanySignup;

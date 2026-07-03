import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            <div className="card bg-secondary border-0 shadow-lg rounded-4">
              <div className="card-body p-5">

                <div className="text-center mb-4">
                  <div
                    className="rounded-circle bg-primary bg-opacity-25 d-inline-flex justify-content-center align-items-center mb-3"
                    style={{ width: 70, height: 70 }}
                  >
                    <i className="bi bi-shield-lock-fill fs-2 text-primary"></i>
                  </div>

                  <h2 className="text-light fw-bold">
                    Welcome Back
                  </h2>

                  <p className="text-light opacity-75">
                    Sign in to your Placement Portal
                  </p>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label text-light">
                      Username / Email
                    </label>

                    <div className="input-group">

                      <span className="input-group-text bg-dark text-light border-secondary">
                        <i className="bi bi-person"></i>
                      </span>

                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                      />

                    </div>
                  </div>

                  <div className="mb-4">

                    <div className="d-flex justify-content-between">
                      <label className="form-label text-light">
                        Password
                      </label>

                      <a
                        href="#"
                        className="text-primary text-decoration-none small"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    <div className="input-group">

                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control bg-dark text-light border-secondary"
                        placeholder="Enter password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                      />

                      <button
                        type="button"
                        className="btn btn-dark border border-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        <i
                          className={`bi ${
                            showPassword
                              ? "bi-eye-slash"
                              : "bi-eye"
                          }`}
                        ></i>
                      </button>

                    </div>

                  </div>

                  <button
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    type="submit"
                  >
                    Sign In
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-light opacity-75">
                      Don't have an account?
                    </span>{" "}
                    <a
                      href="/signup"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Register
                    </a>
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

export default Login;

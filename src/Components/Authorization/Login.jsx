import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { validateEmail, validatePassword } from "../../utils/Authentication";
import Top from "../Popups/Top";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../../utils/axios.js"
import ForgotPasswordModal from "./ForgotPasswordModal.jsx";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showForgot, setShowForgot] = useState(false);
   const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false)
    const [shake, setshake] = useState(false)
    const [top, settop] = useState({
      title : "",
      msg : ""
    })
    const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    setshake(false);
     setErrors((prev) => {
      const newErrors = { ...prev };
      switch (name) {
        case "email":
          if (!validateEmail(value))
            newErrors.email = "Enter a valid email address.";
          else
            delete newErrors.email;
          break;
        case "password":
          if (!validatePassword(value))
            newErrors.password =
              "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
          else
            delete newErrors.password;
          break;
           
      }
      return newErrors;
    });
  };

  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (Object.keys(errors).length !== 0) {
    setshake(true);
    return;
  }

  try {
    localStorage.removeItem("token");
   const response = await api.post("/auth/login", credentials);

    console.log(response.data);

    let {token, role} = response.data.data;

    // Save token/user if returned by backend
    if (token) {
      localStorage.setItem("token", token);
    }
    settop({title : "Welcome Back", msg : "Explore The placement portal"});
    setShow(true);

    setTimeout(() => {
        setShow(false);
        if(role === "STUDENT")  navigate("/student/dashboard");
        else if(role === "COMPANY") navigate("/company/dashboard");
        else if(role === "ADMIN") navigate("/admin/dashboard");
        else navigate("/login")
    
  }, 1500);

  } catch (error) {
    console.error(error);

    if (error.response) {
       settop({title : "Login Failed", msg : error.response.data.message || "Invalid email or password"});
        setShow(true);
      
    } else {
      settop({title : "Login Failed", msg : "Unable to connect to server."});
        setShow(true);
    }
   
  }
  finally{
     setTimeout(() => {
      setShow(false)
    }, 1500);
    setCredentials({
    email: "",
    password: "",
  })
  }
};

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            <div className="card bg-secondary border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <Top show={show} setShow={setShow} title={top.title} msg={top.msg}/>

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
                       className={`form-control bg-dark text-light border-secondary ${errors.email ? "is-invalid" : ""} ${shake && errors.email ? "shake" : ""}`}
                        placeholder="Enter username"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                      />
                     <div className="invalid-feedback">{errors.email}</div></div>
                  </div>

                  <div className="mb-4">

                    <div className="d-flex justify-content-between">
                      <label className="form-label text-light">
                        Password
                      </label>

                      <Link
                      hidden
                      onClick={() => setShowForgot(true)}
                        className="text-primary text-decoration-none small"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                     <ForgotPasswordModal
                show={showForgot}
                handleClose={() => setShowForgot(false)}
            />

                    <div className="input-group">

                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control bg-dark text-light border-secondary ${errors.password ? "is-invalid" : ""} ${shake && errors.password ? "shake" : ""}`}
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
                    {errors.password && (
                        <div className="text-danger small mt-1">
                          {errors.password}
                        </div>
                      )}

                  </div>

                  <button
                    className="btn btn-primary w-100 py-2 fw-semibold btn-press"
                    type="submit"
                  >
                    Sign In
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-light opacity-75">
                      Don't have an account?
                    </span>{" "}
                    <Link
                      to="/role"
                      className="text-primary text-decoration-none fw-semibold"
                    >
                      Register
                    </Link>
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

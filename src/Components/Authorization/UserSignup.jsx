import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  validateEmail,
  validateName,
  validatePassword,
  confirmPassword,
} from "../../utils/Authentication";
import { useLocation, useNavigate } from "react-router-dom";
import Top from "../Popups/Top";
import Input from "./Form/Input";
import PassInput from "./Form/PassInput";
import api from "../../utils/axios.js";

const UserSignup = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const role = loc.state.role;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [top, setTop] = useState({
  title: "",
  msg: "",
});

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };

      switch (name) {
        case "name":
          if (!validateName(value))
            newErrors.name = "Enter a valid name.";
          else delete newErrors.name;
          break;

        case "email":
          if (!validateEmail(value))
            newErrors.email = "Enter a valid email.";
          else delete newErrors.email;
          break;

        case "password":
          if (!validatePassword(value))
            newErrors.password =
              "Password must contain uppercase, lowercase, number and special character.";
          else delete newErrors.password;

          if (
            form.confirmPassword &&
            !confirmPassword(value, form.confirmPassword)
          )
            newErrors.confirmPassword = "Passwords do not match.";
          else delete newErrors.confirmPassword;

          break;

        case "confirmPassword":
          if (!confirmPassword(form.password, value))
            newErrors.confirmPassword = "Passwords do not match.";
          else delete newErrors.confirmPassword;
          break;

        default:
          break;
      }

      return newErrors;
    });
  };



 const handleSubmit = async (e) => {
  e.preventDefault();

  if (Object.keys(errors).length > 0) {
    return;
  }

  try {
    let endpoint = null;
    let registerEnd = null;
    if(role === "STUDENT") {endpoint = "/auth/register/student"; registerEnd = "/students/create"}
    else if(role === "COMPANY") {endpoint = "/auth/register/company"; registerEnd = "/companies/update"}
    else {endpoint = "/auth/register/admin"; registerEnd = "/admins/create"}

    const response = await api.post(endpoint, {
      name: form.name,
      email: form.email,
      password: form.password,
    });

      const responseCom = await api.post(registerEnd, {
         user : {email : form.email},
         companyName : form.name
      });

    console.log(response.data);

    setTop({
      title: "Registration Successful",
      msg: response.data.message + " " +responseCom.data.message || "Account created successfully.",
    });

    setShow(true);

    // Clear form
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setTimeout(() => {
      setShow(false);
      navigate("/login");
    }, 1500);

  } catch (error) {
    console.error(error.response.data.message);

    setTop({
      title: "Registration Failed",
      msg: error.response?.data?.message || "Unable to connect to server.",
    });

    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 1500);
  }
};

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">

          <Top
            show={show}
            setShow={setShow}
            title={top.title}
            msg={top.msg}
          />

          <div className="col-md-8 col-lg-6">

            <div className="card bg-secondary border-0 shadow-lg rounded-4">

              <div className="card-body p-5">

                <div className="text-center mb-4">

                  <div
                    className="bg-primary bg-opacity-25 rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                    style={{ width: 70, height: 70 }}
                  >
                    <i className="bi bi-person-plus-fill fs-2 text-primary"></i>
                  </div>

                  <h2 className="text-light fw-bold">
                    User Registration
                  </h2>

                  <p className="text-light opacity-75">
                    Create your account
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  <div className="row g-3">

                    <Input
                      form={form.name}
                      errors={errors.name}
                      title={`${role === "COMPANY" ? "Comapny Name":"Full Name"}`}
                      danger={true}
                      handleChange={handleChange}
                      name="name"
                      placeholder={`Enter ${role === "COMPANY" ? "Comapny Name":"Full Name"}`}
                    />

                    <Input
                      form={form.email}
                      errors={errors.email}
                      title="Email"
                      danger={true}
                      handleChange={handleChange}
                      name="email"
                      placeholder="Enter your email"
                    />

                    <PassInput
                      form={form.password}
                      errors={errors.password}
                      title="Password"
                      danger={true}
                      handleChange={handleChange}
                      name="password"
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                    />

                    <PassInput
                      form={form.confirmPassword}
                      errors={errors.confirmPassword}
                      title="Confirm Password"
                      danger={true}
                      handleChange={handleChange}
                      name="confirmPassword"
                      showPassword={showConfirm}
                      setShowPassword={setShowConfirm}
                    />

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-2 fw-semibold"
                      >
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Register
                      </button>
                    </div>

                    <div className="col-12 text-center">
                      <span className="text-light opacity-75">
                        Already have an account?
                      </span>{" "}
                      <a
                        href="/login"
                        className="text-primary text-decoration-none fw-semibold"
                      >
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

export default UserSignup;
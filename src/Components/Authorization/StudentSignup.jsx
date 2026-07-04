import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  confirmPassword,
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
  validateStudentId
} from "../../utils/Authentication";
import Top from "../Popups/Top";
import Input from "./Form/Input";
import { useNavigate } from "react-router-dom";
import PassInput from "./Form/PassInput";
import CheckBox from "./Form/CheckBox";
import OptionInpu from "./Form/OptionInpu";

const StudentSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const Departments = ["CSE", "IT", "AI & DS", "ENTC", "Mechanical", "Civil"];
  const Years = ["First", "Second", "Third", "Final"];


  const [form, setForm] = useState({
    name: "",
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

    let fieldValue = type === "checkbox" ? checked : value;

    if (name === "phone") {
      fieldValue = fieldValue.replace(/[^0-9]/g, "").slice(0, 10);
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };

      switch (name) {
        case "name":
          if (!validateName(fieldValue))
            newErrors.name = "Enter a valid Name.";
          else
            delete newErrors.name;
          break;
        case "email":
          if (!validateEmail(fieldValue))
            newErrors.email = "Enter a valid email address.";
          else
            delete newErrors.email;
          break;

        case "studentId":
          if (!validateStudentId(fieldValue))
            newErrors.studentId = "Enter a valid StudentId with alphanumeric and at least 6-20 characters.";
          else
            delete newErrors.studentId;
          break;

        case "phone":
          if (!validateMobile(fieldValue))
            newErrors.phone = "Enter a valid 10-digit mobile number.";
          else
            delete newErrors.phone;
          break;

        case "password":
          if (!validatePassword(fieldValue))
            newErrors.password =
              "Password must be at least 8 characters and include uppercase, lowercase, number and special character.";
          else
            delete newErrors.password;
          break;
        case "confirmPassword":
          if (!confirmPassword(form.password, fieldValue))
            newErrors.confirmPassword =
              "password must be same";
          else
            delete newErrors.confirmPassword;
          break;

        default:
          break;
      }

      return newErrors;
    });
  };
     useEffect(() => {
        if(show === false && form.email !== ""){
          // Register logic *****
          navigate("/")
        }
      }, [show])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.keys(errors).length === 0){
      console.log("login");
      setShow(true)
      return
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
            title={"Login Status"}
            msg={"Register Successfully"}
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

                    <Input form={form.name} errors={errors.name} title={"Full Name"} danger={true} handleChange = {handleChange} name={"name"} placeholder="Enter Full name"/>
                    <Input form={form.email} errors={errors.email} title={"Email"} danger={true} handleChange = {handleChange} name={"email"} placeholder="Enter email"/>
                    <Input form={form.studentId} errors={errors.studentId} title={"Student ID / PRN"} danger={false} handleChange = {handleChange} name={"studentId"} placeholder="Enter Student Id"/>
                    <Input form={form.phone} errors={errors.phone} title={"Phone "} danger={true} handleChange = {handleChange} name={"phone"} placeholder="Phone Number"/>

                    <OptionInpu title="Department" value={form.department} onChange={handleChange} Data={Departments} msg={"Select Department"}/>
                    <OptionInpu title="Year" value={form.year} onChange={handleChange} Data={Years} msg={"Select Year"}/>

                    <PassInput form={form.password} errors={errors.password} title={"Password "} danger={true} handleChange = {handleChange} name={"password"} showPassword={showPassword} setShowPassword={setShowPassword}/>
                    <PassInput form={form.confirmPassword} errors={errors.confirmPassword} title={"Confirm Password "} danger={true} handleChange = {handleChange} name={"confirmPassword"} showPassword={showConfirm} setShowPassword={setShowConfirm}/>

                    <CheckBox checked={form.agree} onChange={handleChange}/>
                
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

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { confirmPassword, validateEmail, validateMobile, validateName, validatePassword, validateWebsite } from "../../utils/Authentication";
import Top from "../Popups/Top";
import Input from "./Form/Input";
import OptionInpu from "./Form/OptionInpu";
import PassInput from "./Form/PassInput";
import CheckBox from "./Form/CheckBox";

const CompanySignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false)
   const indistries = ["Information Technology","Finance","Healthcare","Manufacturing","Education","Other"]

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
        case "companyName":
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

        case "website":
          if (!validateWebsite(fieldValue))
            newErrors.website = "Enter a valid website(eg. www.example.com).";
          else
            delete newErrors.website;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true)
    //Sigup logic *****
    console.log(form);
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-8">
            <div className="card bg-secondary border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">
              <Top
               show = {show}
               setShow = {setShow}
               title = "Register Status"
               msg = {`Company ${form.companyName} Registered Successfully`}
              />

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

                    <Input form={form.companyName} errors={errors.name} title={"Company Name "} danger={true} handleChange = {handleChange} name={"companyName"} placeholder="Enter Company name"/>
                    <Input form={form.email} errors={errors.email} title={"Company Email "} danger={true} handleChange = {handleChange} name={"email"} placeholder="company@example.com"/>
                    <Input form={form.hrName} errors={null} title={"HR Name "} danger={false} handleChange = {handleChange} name={"hrName"} placeholder="HR Manager"/>
                    <Input form={form.phone} errors={errors.phone} title={"Phone "} danger={true} handleChange = {handleChange} name={"phone"} placeholder="+91 XXXXX XXXXX"/>
                    <Input form={form.website} errors={errors.website} title={"Website "} danger={true} handleChange = {handleChange} name={"website"} placeholder="https://example.com"/>
                    <OptionInpu title="Industry" value={form.industry} onChange={handleChange} Data={indistries} msg={"Select Industry"}/>
                    
                    <PassInput form={form.password} errors={errors.password} title={"Password "} danger={true} handleChange = {handleChange} name={"password"} showPassword={showPassword} setShowPassword={setShowPassword}/>
                    <PassInput form={form.confirmPassword} errors={errors.confirmPassword} title={"Confirm Password "} danger={true} handleChange = {handleChange} name={"confirmPassword"} showPassword={showConfirm} setShowPassword={setShowConfirm}/>

                

                 

                 <CheckBox checked={form.agree} onChange={handleChange}/>


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

export default CompanySignup;

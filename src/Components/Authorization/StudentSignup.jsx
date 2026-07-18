import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  validateMobile,
  validateName,
  validateStudentId
} from "../../utils/Authentication";
import Top from "../Popups/Top";
import Input from "./Form/Input";
import { useNavigate } from "react-router-dom";
import CheckBox from "./Form/CheckBox";
import OptionInpu from "./Form/OptionInpu";
import api from "../../utils/axios.js"
import Spinner from "../CommonComp/Spinner.jsx";

const StudentSignup = ({ play, setplay }) => {
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState({});
  const [departments, setDepartments] = useState([]);
  const [passingYears, setPassingYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [msg, setmsg] = useState({msg : "", title : ""});
  const [agree, setAgree] = useState(false)


  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    prn: "",
    phone: "",
    department: {departmentName : ""},
    passingYear: ""
  });


  //load data
  useEffect(() => {
    const loadData = async () => {
      try {
   

      const response = await api.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

        // If your API returns { status, message, data }
        setDepartments(response.data.data || []);

        const currentYear = new Date().getFullYear();

        const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

        setPassingYears(years);
      } catch (error) {
        console.error("Failed to load departments", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  let fieldValue = type === "checkbox" ? checked : value;

  switch (name) {
    case "phone":
      fieldValue = value.replace(/\D/g, "").slice(0, 10);
      break;

    case "passingYear":
      fieldValue = Number(value);
      break;

    default:
      break;
  }

  if (name === "agree") {
    setAgree(checked);

    setForm((prev) => ({
      ...prev,
      agree: checked,
    }));

    return;
  }

  if (name === "department") {
    setForm((prev) => ({
      ...prev,
      department: {
        departmentName: value,
      },
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  }

  setErrors((prev) => {
    const newErrors = { ...prev };

    switch (name) {
      case "firstName":
        !validateName(fieldValue)
          ? (newErrors.firstName = "Enter a valid First Name.")
          : delete newErrors.firstName;
        break;

      case "lastName":
        !validateName(fieldValue)
          ? (newErrors.lastName = "Enter a valid Last Name.")
          : delete newErrors.lastName;
        break;

      case "prn":
        !validateStudentId(fieldValue)
          ? (newErrors.prn = "Enter a valid PRN.")
          : delete newErrors.prn;
        break;

      case "phone":
        !validateMobile(fieldValue)
          ? (newErrors.phone = "Enter a valid 10-digit mobile number.")
          : delete newErrors.phone;
        break;

      default:
        break;
    }

    return newErrors;
  });
};
  //  useEffect(() => {
  //     if(show === false && form.email !== ""){
  //       // Register logic *****
  //       navigate("/")
  //     }
  //   }, [show])

const handleSubmit = async (e) => {
  e.preventDefault();

  if (Object.keys(errors).length > 0) return;

  if (!form.agree) {
    setmsg({
      title: "Registration",
      msg: "Please accept the terms and conditions.",
    });
    setShow(true);
    return;
  }

  try {
    setLoading(true);

    console.log(form);

    const response = await api.post(
      "/students/create",
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setmsg({
      title: "Registration Status",
      msg: response.data.message || "Registered Successfully",
    });
setShow(true);
    setTimeout(() => {
      setShow(false)
      setplay(false)
    }, 1000);

  } catch (error) {
    console.log(error);

    setmsg({
      title: "Registration Status",
      msg: error.response?.data?.message || "Registration Failed",
    });

    setShow(true);

  } finally {
    setLoading(false);

    setTimeout(() => {
      setShow(false);
    }, 5000);
  }
};


  if (loading) {
    return (
     <Spinner/>
    );
  }

  return (
    <>{
      play && <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content bg-secondary border-0 rounded-4">

            {/* Header */}
            <div className="modal-header border-0">

              <h4 className="modal-title text-light fw-bold">
                Student Registration
              </h4>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setplay(false)}
              ></button>

            </div>

            {/* Body */}
            <div className="modal-body p-4">

              <Top
                show={show}
                setShow={setShow}
                title={msg.title}
                msg={msg.msg}
              />

              <div className="text-center mb-4">

                <div
                  className="bg-primary bg-opacity-25 rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
                  style={{ width: 72, height: 72 }}
                >
                  <i className="bi bi-person-plus-fill fs-2 text-primary"></i>
                </div>

                <p className="text-light opacity-75">
                  Create your placement portal account
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  <Input
                    form={form.firstName}
                    errors={errors.firstName}
                    title="First Name"
                    danger={true}
                    handleChange={handleChange}
                    name="firstName"
                    placeholder="First Name"
                  />


                  <Input
                    form={form.lastName}
                    errors={errors.lastName}
                    title="Last Name"
                    danger={true}
                    handleChange={handleChange}
                    name="lastName"
                    placeholder="Last Name"
                  />


                  <Input
                    form={form.prn}
                    errors={errors.prn}
                    title="PRN"
                    danger={false}
                    handleChange={handleChange}
                    name="prn"
                    placeholder="Enter PRN"
                  />

                  <Input
                    form={form.phone}
                    errors={errors.phone}
                    title="Phone"
                    danger={true}
                    handleChange={handleChange}
                    name="phone"
                    placeholder="Phone Number"
                  />

                  <OptionInpu
                    title="Department"
                   value={form.department.departmentName}
                    onChange={handleChange}
                    name={"department"}
                    Data={departments.map(dept => dept.departmentName)}
                    msg="Select Department"
                  />

                  <OptionInpu
                    title="Passing Year"
                    value={form.passingYear}
                    onChange={handleChange}
                    name={"passingYear"}
                    Data={passingYears}
                    msg="Select Passing Year"
                  />



                  <CheckBox
                    checked={agree}
                    onChange={handleChange}
                  />

                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-2 fw-semibold">
                      <i className="bi bi-person-plus-fill me-2"></i>
                      Create Account
                    </button>
                  </div>

                </div>

              </form>

            </div>

          </div>
        </div>
      </div>
    }
    </>

  );
};

export default StudentSignup;

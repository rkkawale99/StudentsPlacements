
import React, { useEffect, useState } from "react";
import Center from "../Popups/Center";
import { useLocation } from "react-router-dom";

const CompanyList = () => {
    const [company1, setcompany] = useState({})
    const [show, setshow] = useState(false)
    const { state } = useLocation();

  useEffect(() => {
    if (state?.name) {
      document
        .getElementById(state.name)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [state]);
    

  let comp = [
    {
      id: 1,
      name: "Google",
      role: "Software Engineer Intern",
      package: "₹45 LPA",
      eligible: true,
      description: "Work on scalable software products and distributed systems."
    },
    {
      id: 2,
      name: "Microsoft",
      role: "Software Development Engineer",
      package: "₹42 LPA",
      eligible: true,
      description: "Develop cloud and enterprise applications."
    },
    {
      id: 3,
      name: "TCS",
      role: "Java Full Stack Developer",
      package: "₹7.2 LPA",
      eligible: true,
      description: "Build enterprise web applications using Java and React."
    },
    {
      id: 4,
      name: "Infosys",
      role: "System Engineer",
      package: "₹5.5 LPA",
      eligible: false,
      description: "Software development, testing, and maintenance."
    }
  ];
  const [companies, setCompanies] = useState(comp)
  useEffect(() => {
    if(company1 !== undefined && show !== false){
        let filter = companies.filter(com => com !== company1);
        setCompanies(filter);
    }
  }, [show])
  

  let handleClick =(company)=>{
        setcompany(company);
        setshow(true)
  }

  return (
    <div className="container py-4">
        <Center show={show} setShow={setshow} title={company1.name} msg={`${company1.role}|${company1.package}`}/>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Available Companies</h2>
          <p className="text-muted mb-0">
            Browse companies and apply for placement opportunities.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {companies.map((company) => (
          <div className={`col-lg-6 ${state.name === company.name ? "zoom-in" : ""}`} id={company.name} key={company.id}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h4>{company.name}</h4>
                    <h6 className="text-primary">{company.role}</h6>
                  </div>

                  <span
                    className={`badge ${
                      company.eligible ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {company.eligible ? "Eligible" : "Not Eligible"}
                  </span>
                </div>

                <hr />

                <p>
                  <strong>Package:</strong> {company.package}
                </p>

                <p>
                  <strong>Job Description</strong>
                </p>

                <p className="text-muted flex-grow-1">
                  {company.description}
                </p>

                <button
                  className="btn btn-primary w-100"
                  disabled={!company.eligible}
                  onClick={()=>{
                    handleClick(company)
                  }}
                >
                  {company.eligible ? "Apply Now" : "Not Eligible"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;

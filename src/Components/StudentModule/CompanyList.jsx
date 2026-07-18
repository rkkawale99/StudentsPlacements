import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";


export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await api.get("/companies");
      setCompanies(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="mb-4">
        <h2 className="fw-bold">Available Companies</h2>
        <p className="text-muted">
          Browse placement opportunities.
        </p>
      </div>

      <div className="row g-4">

        {companies.map((company) => (

          <div className="col-md-6 col-lg-4" key={company.id}>

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body text-center">

                <img
                  src={
                    company.logo
                      ? `data:image/jpeg;base64,${company.logo}`
                      : "https://via.placeholder.com/120"
                  }
                  alt={company.companyName}
                  className="rounded-circle mb-3 border"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover"
                  }}
                />

                <h5 className="fw-bold">
                  {company.companyName}
                </h5>

                <p className="text-muted mb-1">
                  {company.industry || "Not Specified"}
                </p>

                <p className="mb-1">
                  <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
                  {company.headOffice || "-"}
                </p>

                <p className="text-secondary small">
                  {company.address || "-"}
                </p>

                <div className="d-flex gap-2 mt-3">

                  <button
                    className="btn btn-outline-primary w-50"
                    onClick={() =>
                      navigate("/student/companies/jobs", {
                        state : {mode : "list", companyName : company.companyName}
                      })
                    }
                  >
                    View
                  </button>

                  <button
                    className="btn btn-primary w-50"
                    onClick={() =>
                     navigate("/student/companies/details", {state: company})
                    }
                  >
                    More Info
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}
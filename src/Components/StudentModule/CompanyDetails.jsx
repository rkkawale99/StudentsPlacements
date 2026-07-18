import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CompanyDetails = () => {
  const { state: company } = useLocation();
  const navigate = useNavigate();

  if (!company) {
    return (
      <div className="container py-5 text-center">
        <h4>No Company Data Found</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back
      </button>

      <div className="card shadow border-0">

        <div className="card-body p-4">

          <div className="row">

            {/* Company Logo */}
            <div className="col-md-3 text-center mb-4">

              {company.logo ? (
                <img
                  src={`data:image/jpeg;base64,${company.logo}`}
                  alt={company.companyName}
                  className="img-fluid rounded-circle border shadow"
                  style={{
                    width: 170,
                    height: 170,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto"
                  style={{
                    width: 170,
                    height: 170,
                  }}
                >
                  <i
                    className="bi bi-building"
                    style={{ fontSize: "60px" }}
                  ></i>
                </div>
              )}

            </div>

            {/* Company Details */}
            <div className="col-md-9">

              <h2 className="fw-bold mb-1">
                {company.companyName}
              </h2>

              <p className="text-muted mb-4">
                {company.industry || "Industry Not Specified"}
              </p>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <strong>Email</strong>
                  <p>{company.email || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Phone</strong>
                  <p>{company.phone || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Website</strong>
                  <p>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Head Office</strong>
                  <p>{company.headOffice || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Address</strong>
                  <p>{company.address || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Founded</strong>
                  <p>{company.founded || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>Company Size</strong>
                  <p>{company.size || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>HR Name</strong>
                  <p>{company.hrName || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>HR Email</strong>
                  <p>{company.hrEmail || "-"}</p>
                </div>

                <div className="col-md-6 mb-3">
                  <strong>HR Phone</strong>
                  <p>{company.hrPhone || "-"}</p>
                </div>

              </div>

            </div>

          </div>

          <hr />

          <h4 className="mb-3">About Company</h4>

          <p className="text-secondary">
            {company.description || "No description available."}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CompanyDetails;
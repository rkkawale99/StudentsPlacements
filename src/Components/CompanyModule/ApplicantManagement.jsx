
import React from "react";
import ViewApplicants from "./ViewApplicants";


export default function ApplicantManagement(){
  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Applicant Management</h3>
        </div>
        <div className="card-body">
          <ViewApplicants />
        </div>
      </div>
    </div>
  );
}

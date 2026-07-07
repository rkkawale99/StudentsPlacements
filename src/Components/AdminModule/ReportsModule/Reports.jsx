import React from "react";
import BranchWisePlacements from "./BranchWisePlacements";
import CompanyWisePlacements from "./CompanyWisePlacements";
import YearWisePlacements from "./YearWisePlacements";
import StudentReports from "./StudentReports";
import PackageAnalysis from "./PackageAnalysis";
import ExportPDF from "./ExportPDF";
import ExportExcel from "./ExportExcel";
export default function Reports(){
return(<div className="container py-4"><div className="card shadow border-0">
<div className="card-header bg-primary text-white"><h3>Reports & Analytics</h3></div>
<div className="card-body">
<BranchWisePlacements/><hr/>
<CompanyWisePlacements/><hr/>
<YearWisePlacements/><hr/>
<StudentReports/><hr/>
<PackageAnalysis/><hr/>
<div className="d-flex gap-2"><ExportPDF/><ExportExcel/></div>
</div></div></div>);
}
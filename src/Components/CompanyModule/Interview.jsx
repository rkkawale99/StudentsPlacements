import React from "react";
import ScheduleInterview from "./ScheduleInterview";
import OnlineMeetingLink from "./OnlineMeetingLink";
export default function Interview(){
return(
<div className="container py-4">
<div className="card shadow border-0">
<div className="card-header bg-primary text-white"><h3 className="mb-0">Interview Management</h3></div>
<div className="card-body">
<ScheduleInterview/>
<hr/>
<OnlineMeetingLink/>
</div></div></div>);
}
import React,{useState} from "react";
export default function ScheduleInterview(){
const [form,setForm]=useState({candidate:"",date:"",time:"",interviewer:""});
const change=e=>setForm({...form,[e.target.name]:e.target.value});
const submit=e=>{e.preventDefault();alert("Interview Scheduled");};
return(<form onSubmit={submit}>
<h5 className="mb-3">Schedule Interview</h5>
<div className="row g-3">
<div className="col-md-6"><input className="form-control" placeholder="Candidate Name" name="candidate" value={form.candidate} onChange={change}/></div>
<div className="col-md-3"><input type="date" className="form-control" name="date" value={form.date} onChange={change}/></div>
<div className="col-md-3"><input type="time" className="form-control" name="time" value={form.time} onChange={change}/></div>
<div className="col-md-6"><input className="form-control" placeholder="Interviewer" name="interviewer" value={form.interviewer} onChange={change}/></div>
<div className="col-md-6 d-grid"><button className="btn btn-primary">Schedule</button></div>
</div></form>);
}
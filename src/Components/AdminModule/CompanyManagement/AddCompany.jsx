import React,{useState} from "react";

export default function AddCompany({addCompany}){
const [company,setCompany]=useState({
name:"",
email:"",
website:"",
location:"", 
status : "Active"
});

const change=e=>setCompany({...company,[e.target.name]:e.target.value});

return(
<div className="container py-4">
<div className="card shadow">
<div className="card-body">
<h3>Add Company</h3>

<input className="form-control mb-2" placeholder="Company Name" name="name" value={company.name} onChange={change}/>
<input className="form-control mb-2" placeholder="Email" name="email" value={company.email} onChange={change}/>
<input className="form-control mb-2" placeholder="Website" name="website" value={company.website} onChange={change}/>
<input className="form-control mb-3" placeholder="Location" name="location" value={company.location} onChange={change}/>

<button className="btn btn-primary" onClick={()=>{alert("Company Added");
     addCompany(company)}}>
Save Company
</button>

</div>
</div>
</div>
);
}
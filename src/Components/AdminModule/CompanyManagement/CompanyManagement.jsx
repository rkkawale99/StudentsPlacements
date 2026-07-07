import React, { useState } from "react";
import AddCompany from "./AddCompany";


export default function CompanyManagement(){
    const inital=[
{
id:1,
name:"TCS",
location:"Pune",
website:"www.tcs.com",
status:"Active"
},
{
id:2,
name:"Infosys",
location:"Bangalore",
website:"www.infosys.com",
status:"Active"
},
{
id:3,
name:"Capgemini",
location:"Mumbai",
website:"www.capgemini.com",
status:"Inactive"
}
];
const [companies, setcompanies] = useState(inital)


const addCompany = (company)=>{
    setcompanies([...companies, company])
}

return(
<div className="container py-4">
<div className="card shadow border-0">
<div className="card-header bg-primary text-white">
<h3 className="mb-0">Company Management</h3>
</div>
<div className="card-body">
<div>

<h4 className="mb-3">Company Details</h4>

<div className="table-responsive">
<table className="table table-hover align-middle">

<thead>
<tr>
<th>Company</th>
<th>Location</th>
<th>Website</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{companies.map(company=>(
<tr key={company.id}>
<td>{company.name}</td>
<td>{company.location}</td>
<td>{company.website}</td>
<td>
<span className={`badge ${company.status==="Active"?"bg-success":"bg-danger"}`}>
{company.status}
</span>
</td>
</tr>
))}

</tbody>

</table>
</div>
<AddCompany addCompany={addCompany}/>
</div>
</div>
</div>
</div>
);
}
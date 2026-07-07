import React from "react";

const AdminDashboard = ()=>{

const stats=[
{title:"Total Students",value:1250,color:"primary"},
{title:"Total Companies",value:86,color:"success"},
{title:"Active Drives",value:18,color:"warning"},
{title:"Selected Students",value:412,color:"info"},
{title:"Placement Rate",value:"82%",color:"secondary"},
{title:"Highest Package",value:"32 LPA",color:"danger"},
{title:"Average Package",value:"7.8 LPA",color:"dark"},
];

const branches=[
{name:"Computer",placed:120,rate:"90%"},
{name:"IT",placed:95,rate:"85%"},
{name:"ENTC",placed:70,rate:"74%"},
{name:"Mechanical",placed:48,rate:"60%"},
];

return(
<div className="container-fluid py-4">
<div className="d-flex justify-content-between align-items-center mb-4">
<div>
<h2 className="fw-bold">Placement Officer Dashboard</h2>
<p className="text-muted">Placement Statistics Overview</p>
</div>
</div>

<div className="row g-4">
{stats.map((s,i)=>(
<div className="col-lg-3 col-md-4" key={i}>
<div className="card shadow border-0 h-100">
<div className="card-body text-center">
<h6 className="text-muted">{s.title}</h6>
<h2 className={`text-${s.color}`}>{s.value}</h2>
</div>
</div>
</div>
))}
</div>

<div className="row mt-4">
<div className="col-lg-8">
<div className="card shadow border-0">
<div className="card-header bg-primary text-white">
<h5 className="mb-0">Branch-wise Statistics</h5>
</div>
<div className="table-responsive">
<table className="table table-hover mb-0">
<thead>
<tr>
<th>Branch</th>
<th>Students Placed</th>
<th>Placement Rate</th>
</tr>
</thead>
<tbody>
{branches.map((b,i)=>(
<tr key={i}>
<td>{b.name}</td>
<td>{b.placed}</td>
<td><span className="badge bg-success">{b.rate}</span></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>

<div className="col-lg-4">
<div className="card shadow border-0">
<div className="card-header bg-success text-white">
<h5 className="mb-0">Quick Summary</h5>
</div>
<div className="card-body">
<p><strong>Campus Drives:</strong> 18</p>
<p><strong>Offers Released:</strong> 430</p>
<p><strong>Pending Interviews:</strong> 54</p>
<p><strong>Upcoming Companies:</strong> 9</p>
</div>
</div>
</div>
</div>

</div>
);
}
export default AdminDashboard;
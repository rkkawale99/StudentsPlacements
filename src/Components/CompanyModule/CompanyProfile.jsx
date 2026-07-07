
import React,{useState} from "react";
import Top from "../Popups/Top";

const CompanyProfile=()=>{
    const [show, setshow] = useState(false)

const initialCompany={
logo:"https://ui-avatars.com/api/?name=Tech+Solutions&background=0D6EFD&color=fff&size=256",
companyName:"Tech Solutions Pvt. Ltd.",
email:"hr@techsolutions.com",
phone:"+91 9876543210",
website:"https://techsolutions.com",
industry:"Software Development",
size:"250 Employees",
founded:"2018",
headOffice:"Pune, Maharashtra",
address:"Hinjewadi Phase 2, Pune",
description:"Leading software development company providing enterprise solutions.",
hrName:"Rahul Sharma",
hrEmail:"rahul@techsolutions.com",
hrPhone:"+91 9988776655",
benefits:["Health Insurance","WFH","Flexible Hours"],
locations:["Pune","Mumbai"],
brochure:"CompanyProfile.pdf"
};

const [company,setCompany]=useState(initialCompany);
const [editMode,setEditMode]=useState(false);

const handleChange=(e)=>{
setCompany({...company,[e.target.name]:e.target.value});
};

const updateArray=(key,i,val)=>{
const arr=[...company[key]];
arr[i]=val;
setCompany({...company,[key]:arr});
};

const addItem=(key)=>setCompany({...company,[key]:[...company[key],""]});
const removeItem=(key,i)=>setCompany({...company,[key]:company[key].filter((_,x)=>x!==i)});

const save=()=>{setshow(true);setEditMode(false);}
const cancel=()=>{setCompany(initialCompany);setEditMode(false);}

const Field=({label,name})=>(
<div className="mb-3">
<label className="form-label fw-bold">{label}</label>
{editMode?
<input className="form-control" name={name} value={company[name]} onChange={handleChange}/>
:<div>{company[name]}</div>}
</div>
);

return(
<div className="container py-4">
<div className="card shadow">
<div className="card-body">

<div className="d-flex justify-content-between align-items-center">
<div className="d-flex align-items-center">
<Top show={show} setShow={setshow} title="Company Profile" msg="Company profile Updated Successfully"/>
<img src={company.logo} alt="" width="120" height="120" className="rounded-circle border"/>
<div className="ms-4">
<h2>{company.companyName}</h2>
<p className="text-muted">{company.industry}</p>
{editMode &&
<label className="btn btn-primary">
    Upload Logo
<input type="file" hidden className="form-control" accept="image/*"
onChange={(e)=>{
const f=e.target.files[0];
if(f) setCompany({...company,logo:URL.createObjectURL(f)});
}}/>
</label>}
</div>
</div>

{!editMode?
<button className="btn btn-primary" onClick={()=>setEditMode(true)}>Edit Profile</button>
:
<div>
<button className="btn btn-success me-2" onClick={save}>Save</button>
<button className="btn btn-secondary" onClick={cancel}>Cancel</button>
</div>}
</div>

<hr/>

<div className="row">
<div className="col-md-6">
<h4>Company Information</h4>
<Field label="Company Name" name="companyName"/>
<Field label="Email" name="email"/>
<Field label="Phone" name="phone"/>
<Field label="Website" name="website"/>
<Field label="Industry" name="industry"/>
<Field label="Company Size" name="size"/>
<Field label="Founded Year" name="founded"/>
</div>

<div className="col-md-6">
<h4>Office Details</h4>
<Field label="Head Office" name="headOffice"/>
<Field label="Address" name="address"/>
<Field label="HR Name" name="hrName"/>
<Field label="HR Email" name="hrEmail"/>
<Field label="HR Phone" name="hrPhone"/>
</div>
</div>

<hr/>
<h4>About Company</h4>
{editMode?
<textarea className="form-control mb-3" rows="4" name="description" value={company.description} onChange={handleChange}/>
:<p>{company.description}</p>}

<hr/>
<h4>Benefits</h4>
{company.benefits.map((b,i)=>(
<div className="input-group mb-2" key={i}>
{editMode?
<>
<input className="form-control" value={b} onChange={(e)=>updateArray("benefits",i,e.target.value)}/>
<button className="btn btn-danger" onClick={()=>removeItem("benefits",i)}>Delete</button>
</>
:<span className="badge bg-primary p-2">{b}</span>}
</div>
))}
{editMode&&<button className="btn btn-outline-primary mb-4" onClick={()=>addItem("benefits")}>Add Benefit</button>}

<hr/>
<h4>Office Locations</h4>
{company.locations.map((l,i)=>(
<div className="input-group mb-2" key={i}>
{editMode?
<>
<input className="form-control" value={l} onChange={(e)=>updateArray("locations",i,e.target.value)}/>
<button className="btn btn-danger" onClick={()=>removeItem("locations",i)}>Delete</button>
</>
:<div>{l}</div>}
</div>
))}
{editMode&&<button className="btn btn-outline-primary mb-4" onClick={()=>addItem("locations")}>Add Location</button>}

<hr/>
<h4>Company Brochure</h4>
<p>{company.brochure}</p>
{editMode&&<label className="btn btn-primary">
    Upload Brochure<input type="file" hidden className="form-control" accept=".pdf"
onChange={(e)=>{
if(e.target.files[0]) setCompany({...company,brochure:e.target.files[0].name});
}}/></label>}

</div>
</div>
</div>
);
}

export default CompanyProfile;

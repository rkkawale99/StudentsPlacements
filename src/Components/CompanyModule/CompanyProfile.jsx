
import React,{useEffect, useState} from "react";
import Top from "../Popups/Top";
import api from "../../utils/axios";
import Field from "./Field";
import CompanyLogo from "./CompanyLogo";
import UploadLogo from "./UploadLogo";

const CompanyProfile=()=>{
    const [show, setshow] = useState(false)

const initialCompany={
companyName:"Tech Solutions Pvt. Ltd.",
email:"hr@techsolutions.com",
phone:"+91 9876543210",
website:"https://techsolutions.com",
industry:"Software Development",
size:"250",
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


//load info

useEffect(() => {
    loadCompany();
}, []);

const loadCompany = async () => {
    try {

        const response = await api.get("/companies/get");

        setCompany(response.data.data);

    } catch (error) {

        console.log(error);

    }
};

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

const save = async () => {

    try {

        await api.post(
            "/companies/update",
            company
        );

        setshow(true);
        setEditMode(false);

    } catch (error) {

        console.log(error);

    }

};
const cancel=()=>{setCompany(initialCompany);setEditMode(false);}



return(
<div className="container py-4">
<div className="card shadow">
<div className="card-body">

<div className="d-flex justify-content-between align-items-center">
<div className="d-flex align-items-center">
<Top show={show} setShow={setshow} title="Company Profile" msg="Company profile Updated Successfully"/>
<CompanyLogo/>
<div className="ms-4">
<h2>{company.companyName}</h2>
<p className="text-muted">{company.industry}</p>
{editMode &&<UploadLogo/>}
{/* <label className="btn btn-primary">
    Upload Logo
<input type="file" hidden className="form-control" accept="image/*"
onChange={(e)=>{
const f=e.target.files[0];
if(f) setCompany({...company,logo:URL.createObjectURL(f)});
}}/>
</label>} */} 
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
<Field label="Company Name" name="companyName" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Email" name="email" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Phone" name="phone" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Website" name="website" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Industry" name="industry" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Company Size" name="size" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Founded Year" name="founded" company={company} editMode={editMode} handleChange={handleChange}/>
</div>

<div className="col-md-6">
<h4>Office Details</h4>
<Field label="Head Office" name="headOffice" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="Address" name="address" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="HR Name" name="hrName" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="HR Email" name="hrEmail" company={company} editMode={editMode} handleChange={handleChange}/>
<Field label="HR Phone" name="hrPhone" company={company} editMode={editMode} handleChange={handleChange}/>
</div>
</div>

<hr/>
<h4>About Company</h4>
{editMode?
<textarea className="form-control mb-3" rows="4" name="description" value={company.description} onChange={handleChange}/>
:<p>{company.description}</p>}

<hr/>
<h4>Benefits</h4>
{company.benefits?.map((b,i)=>(
<div className="input-group mb-2" key={i}>
{editMode?
<>
<div className="input-group mb-2">
  <input className="form-control" value={b} onChange={(e) => updateArray("benefits", i, e.target.value)}/>
 <button className="btn btn-outline-danger" onClick={()=>removeItem("benefits",i)}>
    <i className="bi bi-trash"></i>
  </button>
</div>
{/* <input className="form-control" value={b} onChange={(e)=>updateArray("benefits",i,e.target.value)} <i className="bi bi-trash"></i>/>     */}

{/* <button className="btn btn-danger" onClick={()=>removeItem("benefits",i)}>Delete</button> */}
</>
:<span className="badge bg-primary p-2">{b}</span>}
</div>
))}
{editMode&&<button className="btn btn-outline-primary mb-4" onClick={()=>addItem("benefits")}>Add Benefit</button>}

<hr/>
<h4>Office Locations</h4>
{company.locations?.map((l,i)=>(
<div className="input-group mb-2" key={i}>
{editMode?
<>
<div className="input-group mb-2">
<input className="form-control" value={l} onChange={(e)=>updateArray("locations",i,e.target.value)}/>
<button className="btn btn-outline-danger" onClick={()=>removeItem("locations",i)}><i className="bi bi-trash"></i></button>
</div>
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

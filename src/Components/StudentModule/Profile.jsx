
import React, { useState } from "react";

const Profile = () => {
  const initialStudent = {
    profile: "https://ui-avatars.com/api/?name=Rushi+Kawale&background=0D6EFD&color=fff&size=256",
    name: "Rushi Kawale",
    rollNo: "CE2026001",
    email: "rushi@example.com",
    phone: "9876543210",
    dob: "15 Aug 2004",
    gender: "Male",
    address: "Pune, Maharashtra",
    linkedin: "https://linkedin.com",
    github: "https://github.com/rkkawale99",
    college: "ABC Institute of Technology",
    department: "Computer Engineering",
    year: "Final Year",
    cgpa: "8.72",
    ssc: "90%",
    hsc: "82%",
    backlog: "0",
    skills: ["Java","Spring Boot","React","MongoDB"],
    projects: [
      {title:"Placement Management System",description:"Campus placement portal."},
      {title:"Student Attendance System",description:"QR based attendance system."}
    ],
    certifications:["Oracle Java","React Development"],
    resume:"Resume.pdf"
  };

  const [student,setStudent]=useState(initialStudent);
  const [editMode,setEditMode]=useState(false);

  const handleChange=(e)=>{
    setStudent({...student,[e.target.name]:e.target.value});
  };

  const handleSkillChange=(i,v)=>{
    const skills=[...student.skills];
    skills[i]=v;
    setStudent({...student,skills});
  };

  const addSkill=()=>setStudent({...student,skills:[...student.skills,""]});
  const removeSkill=(i)=>setStudent({...student,skills:student.skills.filter((_,x)=>x!==i)});

  const handleProject=(i,key,val)=>{
    const arr=[...student.projects];
    arr[i][key]=val;
    setStudent({...student,projects:arr});
  };

  const addProject=()=>setStudent({...student,projects:[...student.projects,{title:"",description:""}]});
  const removeProject=(i)=>setStudent({...student,projects:student.projects.filter((_,x)=>x!==i)});

  const handleCert=(i,v)=>{
    const arr=[...student.certifications];
    arr[i]=v;
    setStudent({...student,certifications:arr});
  };

  const addCert=()=>setStudent({...student,certifications:[...student.certifications,""]});
  const removeCert=(i)=>setStudent({...student,certifications:student.certifications.filter((_,x)=>x!==i)});

  const save=()=>{ alert("Profile Saved"); setEditMode(false); };
  const cancel=()=>{ setStudent(initialStudent); setEditMode(false); };

  const Field=({label,name})=>(
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      {editMode?
        <input className="form-control" name={name} value={student[name]} onChange={handleChange}/>
        :
        <div>{student[name]}</div>}
    </div>
  );

  return(
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img src={student.profile} alt="" className="rounded-circle border" width="120" height="120"/>
              <div className="ms-4">
                <h2>{student.name}</h2>
                <p className="text-muted">{student.department}</p>
                {editMode &&
                  <input type="file" className="form-control" accept="image/*"
                  onChange={(e)=>{
                    const f=e.target.files[0];
                    if(f) setStudent({...student,profile:URL.createObjectURL(f)});
                  }}/>}
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
              <h4>Personal Information</h4>
              <Field label="Full Name" name="name"/>
              <Field label="Email" name="email"/>
              <Field label="Phone" name="phone"/>
              <Field label="Date of Birth" name="dob"/>
              <Field label="Gender" name="gender"/>
              <Field label="Address" name="address"/>
              <Field label="LinkedIn" name="linkedin"/>
              <Field label="GitHub" name="github"/>
            </div>

            <div className="col-md-6">
              <h4>Academic Details</h4>
              <Field label="College" name="college"/>
              <Field label="Department" name="department"/>
              <Field label="Year" name="year"/>
              <Field label="CGPA" name="cgpa"/>
              <Field label="SSC %" name="ssc"/>
              <Field label="HSC %" name="hsc"/>
              <Field label="Backlogs" name="backlog"/>
            </div>
          </div>

          <hr/>
          <h4>Skills</h4>
          {student.skills.map((s,i)=>(
            <div className="input-group mb-2" key={i}>
              {editMode?
                <>
                  <input className="form-control" value={s} onChange={(e)=>handleSkillChange(i,e.target.value)}/>
                  <button className="btn btn-danger" onClick={()=>removeSkill(i)}>Delete</button>
                </>
                :
                <span className="badge bg-primary p-2">{s}</span>}
            </div>
          ))}
          {editMode && <button className="btn btn-outline-primary mb-4" onClick={addSkill}>Add Skill</button>}

          <hr/>
          <h4>Projects</h4>
          {student.projects.map((p,i)=>(
            <div className="card mb-3" key={i}>
              <div className="card-body">
                {editMode?<>
                  <input className="form-control mb-2" placeholder="Title" value={p.title} onChange={(e)=>handleProject(i,"title",e.target.value)}/>
                  <textarea className="form-control mb-2" placeholder="Description" value={p.description} onChange={(e)=>handleProject(i,"description",e.target.value)}/>
                  <button className="btn btn-danger" onClick={()=>removeProject(i)}>Delete Project</button>
                </>:<>
                  <h5>{p.title}</h5>
                  <p>{p.description}</p>
                </>}
              </div>
            </div>
          ))}
          {editMode && <button className="btn btn-outline-primary mb-4" onClick={addProject}>Add Project</button>}

          <hr/>
          <h4>Certifications</h4>
          {student.certifications.map((c,i)=>(
            <div className="input-group mb-2" key={i}>
              {editMode?<>
                <input className="form-control" value={c} onChange={(e)=>handleCert(i,e.target.value)}/>
                <button className="btn btn-danger" onClick={()=>removeCert(i)}>Delete</button>
              </>:<div>{c}</div>}
            </div>
          ))}
          {editMode && <button className="btn btn-outline-primary mb-4" onClick={addCert}>Add Certification</button>}

          <hr/>
          <h4>Resume</h4>
          <p>{student.resume}</p>
          {editMode &&
            <input type="file" className="form-control" accept=".pdf"
            onChange={(e)=>{
              if(e.target.files[0]){
                setStudent({...student,resume:e.target.files[0].name});
              }
            }}/>}
        </div>
      </div>
    </div>
  );
};

export default Profile;

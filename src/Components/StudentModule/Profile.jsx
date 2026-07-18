
import React, { useEffect, useState } from "react";
import { initialStudent } from "../../utils/initalData";
import { assignSkill, loadSkills, loadStudent, removeSkill, loadDepartments, saveStudent } from "../../utils/Load";
import Top from "../../Components/Popups/Top.jsx"
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Field from "./Field.jsx";
import UploadStudent from "./uploadStudent.jsx";
import StudentPhoto from "./StudentPhoto.jsx";



const Profile = () => {

  const [student, setStudent] = useState(initialStudent);
  const [editMode, setEditMode] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [show, setshow] = useState(false)
  const [error, setError] = useState({ title: "Profile Error", msg: "" })
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [passingYears, setPassingYears] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);



  //load data before loading page
  useEffect(() => {
    loadStudent(setStudent, initialStudent, setshow, setError, navigate);
    loadSkills(setAllSkills);
    loadDepartments(setDepartments, setPassingYears);
  }, []);



  const selectedSkills = student.skills.map(skill => ({
    value: skill.id,
    label: skill.skillName
  }));


  const filteredSkills = allSkills.filter(
    skill =>
      !selectedSkills.some(
        selected => selected.value === skill.value
      )
  );


  //Common function all fields
  const handleChange = e =>
    setStudent({ ...student, [e.target.name]: e.target.value });


  //Departments only
  const handleDepartment = e =>
    setStudent({
      ...student,
      department: { departmentName: e.target.value }
    });
  //Academic fields only  
  const handleAcademic = e =>
    setStudent({
      ...student,
      academics: {
        ...student.academics,
        [e.target.name]: e.target.value
      }
    });
  //User
  const handleUser = e =>
    setStudent({
      ...student,
      user: {
        ...student.user,
        [e.target.name]: e.target.value
      }
    });


  //projects
  const handleProject = (i, key, value) => {
    const arr = [...student.projects];
    arr[i][key] = value;
    setStudent({ ...student, projects: arr });
  };

  const addProject = () =>
    setStudent({
      ...student,
      projects: [...student.projects, { title: "", des: "", githubUrl: "", studentId: student.id }]
    });

  const removeProject = i =>
    setStudent({
      ...student,
      projects: student.projects.filter((_, x) => x !== i)
    });

  const handleCertification = (i, key, value) => {
    const arr = [...student.certifications];
    arr[i][key] = value;
    setStudent({ ...student, certifications: arr });


  };

  const addCertification = () =>
    setStudent({
      ...student,
      certifications: [...student.certifications, { name: "", issuer: "" }]
    });

  const removeCertification = i =>
    setStudent({
      ...student,
      certifications: student.certifications.filter((_, x) => x !== i)
    });


  //Sklls
  const handleSkillChange = async (newSelected, actionMeta) => {

    switch (actionMeta.action) {

      case "remove-value":
      case "pop-value":

        console.log("Removed:", actionMeta.removedValue);
        const removed = actionMeta.removedValue;

        removeSkill(removed.value, setshow, setError, setStudent);

        setStudent(prev => ({
          ...prev,
          skills: prev.skills.filter(
            skill => skill.id !== removed.value
          )
        }));

        break;


      case "select-option":
      case "create-option":

        const addedSkill = actionMeta.option;

        if (addedSkill.__isNew__) {
          await assignSkill(
            addedSkill.value,
            setshow,
            setError,
            setStudent
          );

        } else {

          await assignSkill(
            addedSkill.value,
            setshow,
            setError,
            setStudent
          );
        }


        break;


    }
  };




  const save = async () => {
    const res = await saveStudent(
      student,
      setshow,
      setError,
      setStudent
    );
    console.log(res);


    if (res) {
      setEditMode(false);

      // Optional: Reload latest data from server
      loadStudent(
        setStudent,
        initialStudent,
        setshow,
        setError,
        navigate
      );
    }
  };

  const cancel = () => {
    setStudent(initialStudent);
    setEditMode(false);
  };



  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
             <StudentPhoto/>
              {/* <img src="http://localhost:8080/api/students/get/photo" alt="" className="rounded-circle border" width="120" height="120" /> */}
              <div className="ms-4">
                <h2>{student.firstName}</h2>
                <p className="text-muted">{student.department.departmentName}</p>
                {editMode &&
                  // <input
                  //   type="file"
                  //   accept="image/*"
                  //   className="form-control"
                  //   onChange={(e) => {
                  //     const file = e.target.files[0];

                  //     if (!file) return;

                  //     setPhotoFile(file);

                  //     // preview only
                  //     setStudent(prev => ({
                  //       ...prev,
                  //       photo: URL.createObjectURL(file)
                  //     }));
                  //   }}
                  // />
                  <UploadStudent/>}
              </div>
            </div>

            {!editMode ?
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
              :
              <div>
                <button className="btn btn-success me-2" onClick={save}>Save</button>
                <button className="btn btn-secondary" onClick={cancel}>Cancel</button>
              </div>}
          </div>

          <hr />

          <div className="row">
            <div className="row">
              <h4>Personal Information</h4>
              <div className="col-md-6">
                <Field
                  label="First Name"
                  name="firstName"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Last Name"
                  name="lastName"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Email"
                  name="email"
                  type="user"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                  handleUser={handleUser}
                />

                <Field
                  label="Phone"
                  name="phone"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Date of Birth"
                  name="dob"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />
              </div>
              <div className="col-md-6">

                <Field
                  label="Gender"
                  name="gender"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Address"
                  name="address"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="CGPA"
                  name="cgpa"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Department Name"
                  name="departmentName"
                  type="department"
                  departments={departments}
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Backlogs"
                  name="backlog"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />
              </div>
            </div>

            <div className="row">
              <h4>Academic Details</h4>
              <div className="col-md-6">
                <Field
                  label="College"
                  name="collegeName"
                  type="academics"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="Current Year"
                  name="currentYear"
                  student={student}
                  type="passingYear"
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="SSC %"
                  name="sscPercentage"
                  type="academics"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />
              </div>
              <div className="col-md-6">
                <Field
                  label="HSC %"
                  name="hscPercentage"
                  type="academics"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="LinkedIn"
                  name="linkedinUrl"
                  type="academics"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />

                <Field
                  label="GitHub"
                  name="githubUrl"
                  type="academics"
                  student={student}
                  editMode={editMode}
                  handleChange={handleChange}
                  handleAcademic={handleAcademic}
                  handleDepartment={handleDepartment}
                />
              </div>
            </div>



            <hr />
            <h4>Skills</h4>

            {editMode ?

              <CreatableSelect
                isMulti
                options={filteredSkills}
                value={selectedSkills}
                onChange={handleSkillChange}
                placeholder="Search or create skills..."
                classNamePrefix="skill"
                className="skill-select"

              />

              :

              <div>

                {student.skills.map(skill => (

                  <span
                    key={skill.id}
                    className="badge bg-primary me-2"
                  >
                    {skill.skillName}

                  </span>

                ))}

              </div>

            }

            <hr />
            <h4>Projects</h4>
            {student.projects.map((p, i) => (
              <div className="card mb-3 col-md-6" key={i}>
                <div className="card-body bg-secondary shadow rounded-2">
                  {editMode ? <>


                    <div className="d-flex mb-2"><input className="form-control" style={{ marginRight: 10 }} placeholder="Title" value={p.title} onChange={(e) => handleProject(i, "title", e.target.value)} />
                      <button className="btn btn-white mx-2" style={{ right: 20 }} onClick={() => removeProject(i)}><i className="bi bi-trash"></i></button>
                    </div>
                    <textarea className="form-control mb-2" placeholder="Description" value={p.des} onChange={(e) => handleProject(i, "des", e.target.value)} />
                    <input className="form-control" placeholder="Project URL" value={p.githubUrl} onChange={(e) => handleProject(i, "githubUrl", e.target.value)} />



                  </> : <>
                    <h5>{p.title}</h5>
                    <p>{p.des}</p>
                    <span className="badge bg-primary">{p.githubUrl}</span>
                  </>}
                </div>
              </div>
            ))}
            {editMode && <button className="btn btn-outline-primary mb-4" onClick={addProject}>Add Project</button>}

            <hr />
            <h4>Certifications</h4>
            {student.certifications == null || student.certifications.length === 0 ? (
              <p className="text-muted">No certifications available.</p>
            ) : (
              student.certifications.map((c, i) => (
                <div className="card mb-3 col-md-6" key={i}>
                  {editMode ? (
                    <>
                      <input
                        className="form-control mb-2"
                        value={c.name}
                        onChange={(e) =>
                          handleCertification(i, "name", e.target.value)
                        }
                      />

                      <input
                        className="form-control mb-2"
                        value={c.issuer}
                        onChange={(e) =>
                          handleCertification(i, "issuer", e.target.value)
                        }
                      />

                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeCertification(i)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (

                    <div className="card-body bg-secondary shadow rounded-2 mb-2"><h5>{c.name}</h5><p>{c.issuer}</p></div>

                  )}
                </div>
              ))
            )}
            {editMode && <button className="btn btn-outline-primary mb-4" onClick={addCertification}>Add Certification</button>}

            <hr />
            <h4>Resume</h4>
            <p>{student.resume}</p>
            {editMode &&
              <input type="file" className="form-control" accept=".pdf"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setStudent({ ...student, resume: e.target.files[0].name });
                  }
                }} />}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Profile;

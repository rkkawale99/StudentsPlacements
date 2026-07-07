import React, { useState } from "react";
import AddStudent from "./AddStudent";
import ActivateDeactivateStudent from "./ActivateDeactivateStudent";
export default function StudentManagement(){
    const [students, setStudents] = useState([
  { id: 1, name: "Rushi Kawale", branch: "Computer", status: "Active" },
  { id: 2, name: "Priya Patil", branch: "IT", status: "Inactive" }
]);


const addStudent = (newStudents) => {
  const formattedStudents = newStudents.map((student) => ({
    id: Date.now() + Math.random(),
    name: student.name,
    branch: student.branch,
    status: "Active",
  }));

  setStudents((prev) => [...prev, ...formattedStudents]);
};
const actDeacStudent = (id) => {
  setStudents(
    students.map((student) =>
      student.id === id
        ? {
            ...student,
            status: student.status === "Active" ? "Inactive" : "Active",
          }
        : student
    )
  );
};

    const[s,setS]=useState("");
    const f=students.filter(x=>x.name.toLowerCase().includes(s.toLowerCase()));

return(<div className="container py-4">
<div className="card shadow border-0">
<div className="card-header bg-primary text-white"><h3 className="mb-0">Student Management</h3></div>
<div className="card-body">
<>
<div className="row mb-3"><div className="col-md-6"><input className="form-control" placeholder="Search Student" value={s} onChange={e=>setS(e.target.value)}/></div></div>
<table className="table table-hover"><thead><tr><th>Name</th><th>Branch</th><th>Status</th></tr></thead><tbody>{f.map(st=><tr key={st.id} className={`${st.status === "Inactive" ? "text-decoration-line-through" : ""}`}><td>{st.name}</td><td>{st.branch}</td><td>{st.status}</td> <td><button
  className={`btn btn-${st.status !== "Active" ? "success" : "danger"}`}
  onClick={() => actDeacStudent(st.id)}
>
  {st.status === "Active" ? "Deactivate" : "Activate"}
</button></td>  </tr>)}</tbody></table>
</>
</div>
<AddStudent addStudent={addStudent}/></div></div>);
}
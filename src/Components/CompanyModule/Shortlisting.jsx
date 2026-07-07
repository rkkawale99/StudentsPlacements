
import React,{useState} from "react";
import Top from "../Popups/Top";


const initial=[
{id:1,name:"Rushi Kawale",branch:"Computer",cgpa:8.72,selected:false},
{id:2,name:"Priya Patil",branch:"IT",cgpa:9.10,selected:false},
{id:3,name:"Amit Sharma",branch:"ENTC",cgpa:8.25,selected:false},
];

export default function Shortlisting(){
const [students,setStudents]=useState(initial);
const [show, setshow] = useState(false)
const [selected, setselected] = useState(0)
const handle=()=>{
const selected=students.filter(s=>s.selected);
setselected(selected.length);
setshow(true)
};

const toggle=(id)=>{
 setStudents(students.map(s=>s.id===id?{...s,selected:!s.selected}:s));
};

return(
<div className="container py-4">
<div className="card shadow border-0">
    <Top show={show} setShow={setshow} title={"Shortlisted Candidates"} msg= {`${selected} ${selected === 1 ? "candidate": "candidates"} shortlisted.`}/>
<div className="card-header bg-primary text-white">
<h3 className="mb-0">Shortlisting</h3>
</div>
<div className="card-body">
<div className="table-responsive">
<table className="table align-middle">
<thead>
<tr>
<th></th><th>Name</th><th>Branch</th><th>CGPA</th>
</tr>
</thead>
<tbody>
{students.map(s=>(
<tr key={s.id}>
<td><input type="checkbox" checked={s.selected} onChange={()=>toggle(s.id)}/></td>
<td>{s.name}</td>
<td>{s.branch}</td>
<td>{s.cgpa}</td>
</tr>
))}
</tbody>
</table>
</div>
<div className="d-flex gap-2 mt-3">
<button className="btn btn-success" onClick={handle}>
Select Candidates
</button>
<button className="btn btn-danger" onClick={handle}>
Reject Candidates
</button>
</div>
</div>
</div>
</div>
);
}

import React,{useState} from "react";

export default function SelectStudents(){
const students=[
{id:1,name:"Rushi Kawale",branch:"Computer",cgpa:8.72},
{id:2,name:"Priya Patil",branch:"IT",cgpa:9.10},
{id:3,name:"Amit Sharma",branch:"ENTC",cgpa:8.25},
];

const [selected,setSelected]=useState([]);

const toggle=(id)=>{
setSelected(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
};

return(
<div>
<h5 className="mb-3">Select Students</h5>
<div className="table-responsive">
<table className="table table-hover align-middle">
<thead>
<tr><th></th><th>Name</th><th>Branch</th><th>CGPA</th></tr>
</thead>
<tbody>
{students.map(s=>(
<tr key={s.id}>
<td><input type="checkbox" checked={selected.includes(s.id)} onChange={()=>toggle(s.id)} /></td>
<td>{s.name}</td>
<td>{s.branch}</td>
<td>{s.cgpa}</td>
</tr>
))}
</tbody>
</table>
</div>
<button className="btn btn-success" onClick={()=>alert(selected.length+" student(s) selected.")}>
Confirm Selection
</button>
</div>
);
}
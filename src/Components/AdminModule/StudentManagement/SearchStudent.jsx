import React,{useState} from "react";
export default function SearchStudent({students}){
const[s,setS]=useState("");
const f=students.filter(x=>x.name.toLowerCase().includes(s.toLowerCase()));
return(<>
<div className="row mb-3"><div className="col-md-6"><input className="form-control" placeholder="Search Student" value={s} onChange={e=>setS(e.target.value)}/></div></div>
<table className="table table-hover"><thead><tr><th>Name</th><th>Branch</th><th>Status</th></tr></thead><tbody>{f.map(st=><tr key={st.id}><td>{st.name}</td><td>{st.branch}</td><td>{st.status}</td></tr>)}</tbody></table>
</>);
}
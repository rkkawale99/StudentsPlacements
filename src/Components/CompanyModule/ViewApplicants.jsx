
import React,{useState} from "react";
import FilterStudents from "./FilterStudents";

const data=[
{id:1,name:"Rushi Kawale",branch:"Computer",cgpa:8.72,resume:"Rushi_Resume.pdf"},
{id:2,name:"Priya Patil",branch:"IT",cgpa:9.10,resume:"Priya_Resume.pdf"},
{id:3,name:"Amit Sharma",branch:"ENTC",cgpa:8.25,resume:"Amit_Resume.pdf"}
];

export default function ViewApplicants(){
 const [search,setSearch]=useState("");
 const [branch, setBranch] = useState("All Branches");
 const [cgpa, setCgpa] = useState("All CGPA");
 console.log(search);
 
 const filtered=data.filter(s=>{
    const searchMatch = s.name.toLowerCase().includes(search.toLowerCase())
    const branchMatch =
    branch === "All Branches" || s.branch === branch;
     const CGPAMatch =
    cgpa === "All CGPA" || s.cgpa >= Number(cgpa.slice(0, -1));

  return searchMatch && branchMatch && CGPAMatch;
 });
 return(
 <>
 <FilterStudents search={search} setSearch={setSearch} branch={branch} setBranch={setBranch} cgpa={cgpa} setCgpa={setCgpa}/>
 <div className="table-responsive mt-3">
 <table className="table table-hover align-middle">
 <thead><tr><th>Name</th><th>Branch</th><th>CGPA</th><th>Resume</th></tr></thead>
 <tbody>
 {filtered.map(s=>(
 <tr key={s.id}>
 <td>{s.name}</td>
 <td>{s.branch}</td>
 <td>{s.cgpa}</td>
 <td><a href="#" download={s.resume}>Download Resume</a></td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </>
 );
}

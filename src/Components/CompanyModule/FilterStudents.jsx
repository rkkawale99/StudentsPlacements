
import React from "react";

export default function FilterStudents({search,setSearch, branch, setBranch, cgpa, setCgpa}){
 return(
 <div className="row g-3">
 <div className="col-md-6">
 <input
 className="form-control"
 placeholder="Search student..."
 value={search}
 onChange={(e)=>setSearch(e.target.value)}
 />
 </div>
 <div className="col-md-3">
  <select
    className="form-select"
    value={branch}
    onChange={(e) => {
      setBranch(e.target.value);
    }}
  >
 <option>All Branches</option>
 <option>Computer</option>
 <option>IT</option>
 <option>ENTC</option>
 </select>
 </div>
 <div className="col-md-3">
  <select
    className="form-select"
    value={cgpa}
    onChange={(e) => {
      setCgpa(e.target.value);
    }}
  >
 <option>All CGPA</option>
 <option>8+</option>
 <option>9+</option>
 </select>
 </div>
 </div>
 );
}

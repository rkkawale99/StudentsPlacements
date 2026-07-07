import React from "react";
export default function BranchWisePlacements(){
const data=[{branch:"Computer",placed:120},{branch:"IT",placed:95},{branch:"ENTC",placed:70}];
return(<div><h5>Branch-wise Placements</h5><table className="table"><thead><tr><th>Branch</th><th>Placed</th></tr></thead><tbody>{data.map((d,i)=><tr key={i}><td>{d.branch}</td><td>{d.placed}</td></tr>)}</tbody></table></div>);
}
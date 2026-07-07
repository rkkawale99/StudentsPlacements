import React from "react";
export default function CompanyWisePlacements(){
const data=[{company:"TCS",count:80},{company:"Infosys",count:60},{company:"Capgemini",count:45}];
return(<div><h5>Company-wise Placements</h5><table className="table"><thead><tr><th>Company</th><th>Selected</th></tr></thead><tbody>{data.map((d,i)=><tr key={i}><td>{d.company}</td><td>{d.count}</td></tr>)}</tbody></table></div>);
}
import React from "react";
export default function YearWisePlacements(){
const data=[{year:2024,placed:210},{year:2025,placed:340},{year:2026,placed:412}];
return(<div><h5>Year-wise Placements</h5><table className="table"><thead><tr><th>Year</th><th>Placed</th></tr></thead><tbody>{data.map((d,i)=><tr key={i}><td>{d.year}</td><td>{d.placed}</td></tr>)}</tbody></table></div>);
}
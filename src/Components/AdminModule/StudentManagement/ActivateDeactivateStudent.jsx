import React,{useState} from "react";
export default function ActivateDeactivateStudent({onCick, status, student}){
const[a,setA]=useState(status);
return <button className={`btn ${a?"btn-secondary":"btn-success"}`} onClick={()=>{setA(!a)
    onclick(student);
}}>{a?"Deactivate Student":"Activate Student"}</button>;
}
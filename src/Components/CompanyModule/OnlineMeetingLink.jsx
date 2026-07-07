import React,{useState} from "react";
export default function OnlineMeetingLink(){
const [link,setLink]=useState("");
return(<div>
<h5 className="mb-3">Online Meeting Link</h5>
<div className="input-group">
<input className="form-control" placeholder="https://meet.google.com/..." value={link} onChange={e=>setLink(e.target.value)}/>
<button className="btn btn-success" onClick={()=>alert(link? "Meeting Link Saved":"Enter meeting link")}>Save Link</button>
</div></div>);
}
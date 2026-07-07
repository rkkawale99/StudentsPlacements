
import React from "react";

export default function DownloadResume({fileName="Resume.pdf"}){
 return(
 <button
 className="btn btn-success"
 onClick={()=>alert("Download: "+fileName)}
 >
 Download Resume
 </button>
 );
}

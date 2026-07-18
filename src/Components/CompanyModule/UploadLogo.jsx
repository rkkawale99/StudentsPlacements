import { useState } from "react";
import axios from "axios";
import api from "../../utils/axios";
import Top from "../Popups/Top";

function UploadLogo() {
   

    const [photo, setPhoto] = useState(null);
    const [show, setShow] = useState(false);
    const [pop, setPop] = useState({
        title : "",
        msg : ""
    })

    const uploadStudent = async () => {

        const formData = new FormData();

        formData.append("photo", photo);

        try{

            const response =await api.post("/companies/upload",
                formData);

            alert("Uploaded Successfully");
            setShow(true);
            setPop({title : "Upload Status",msg : "Uploaded Successfully"})

            console.log(response.data);

        }catch(error){
            console.log(error?.response);
            
             setShow(true);
            setPop({title : "Upload Status",msg : error?.response?.data?.message})

            console.log(error);

        }finally{
            setTimeout(() => {
                setShow(false);
            }, 2000);
        }

    };

    return (

        <div>
            <Top show={show} setShow={setShow} title={pop.title} msg={pop.msg}/>

            <input

                type="file"

                accept="image/*"

                onChange={(e)=>setPhoto(e.target.files[0])}

            />

            <br/><br/>

            <button onClick={uploadStudent}>

                Upload

            </button>

        </div>

    );

}

export default UploadLogo;
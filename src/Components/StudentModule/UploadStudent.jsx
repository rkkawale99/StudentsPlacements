import { useState } from "react";
import axios from "axios";
import api from "../../utils/axios";

function UploadStudent() {
   

    const [photo, setPhoto] = useState(null);

    const uploadStudent = async () => {

        const formData = new FormData();

        formData.append("photo", photo);

        try{

            const response =await api.post("/students/upload",
                formData);

            alert("Uploaded Successfully");

            console.log(response.data);

        }catch(error){

            console.log(error);

        }

    };

    return (

        <div>

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

export default UploadStudent;
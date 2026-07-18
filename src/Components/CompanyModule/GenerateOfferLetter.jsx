import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import api from "../../utils/axios";
import Spinner from "../CommonComp/Spinner";


export default function GenerateOfferLetter() {
  const [results, setResults] = useState([]);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    loadPlacementResults();
  }, []);

  const loadPlacementResults = async () => {
    try {
      setloading(true)
      const res = await api.get("/placement-results");
      setResults(res.data.data);
       setloading(false)
    } catch (err) {
      console.error(err);
       setloading(false)
    }
   
  };

  const generatePDF = (student, mode="") => {
   
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("OFFER LETTER", 70, 20);

    doc.setFontSize(12);

    doc.text(`Dear ${student.studentName},`, 20, 40);

    doc.text(
      `Congratulations! We are pleased to offer you employment at ${student.companyName}.` ,
      20,
      55
    );

    doc.text(`Company : ${student.companyName}`, 20, 75);
    doc.text(`Salary : ${student.salary} LPA`, 20, 87);
    doc.text(`Joining Date : ${student.joiningDate}`, 20, 99);
    doc.text(`Job Role : ${student.jobRole}`, 20, 111);

    doc.text(
      "We welcome you to our organization and wish you a successful career.",
      20,
      132
    );
    if(mode === "email") return doc.output("blob");

    doc.save(`${student.studentName}_OfferLetter.pdf`);
  };


  const generateAll = () => {
     setloading(true)
    results.forEach(generatePDF);
     setloading(false)
  };

  const sendAll = () => {
    results.forEach(generatePdfAndSendEmail);
  };


const generatePdfAndSendEmail = async (student) => {
  setloading(true)
  try {
    // Convert PDF to Blob
    const pdfBlob = generatePDF(student, "email")

    // Convert Blob to Base64
    const reader = new FileReader();

    reader.readAsDataURL(pdfBlob);

    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];

      await api.post("/placement-results/company/offer/send", {
        applicationId: student.applicationId,
        studentName: student.studentName,
        companyName: student.companyName,
        joiningDate: student.joiningDate,
        salary: student.salary,
        pdf: base64,
        fileName: `${student.studentName}_OfferLetter.pdf`
      });

      alert("Offer Letter Sent Successfully");
      setloading(false)
    };

  } catch (err) {
    console.error(err);
    alert("Failed to send email");
    setloading(false)
  }
};

  return  (
    loading ? <Spinner/> :
   ( <div className="container py-4">

      <div className="d-flex justify-content-between mb-4">
        <h3>Offer Letters</h3>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={generateAll}
          >
            Generate All PDFs
          </button>

          <button
            className="btn btn-primary"
            onClick={sendAll}
          >
            Send Email To All          </button>
        </div>
      </div>

      <div className="row">

        {results.map((student) => (

          <div className="col-md-4 mb-4 " key={student.id}>

            <div className="card shadow-sm h-100 bg-secondary">

              <div className="card-body">

                <h5>{student.studentName}</h5>

                <hr />

                <p>
                  <strong>Company :</strong> {student.companyName}
                </p>

                <p>
                  <strong>Salary :</strong> {student.salary} LPA
                </p>

                <p>
                  <strong>Joining :</strong> {student.joiningDate}
                </p><p>
                  <strong>Job Role :</strong> {student.jobRole}
                </p>

              </div>

              <div className="card-footer">

                <button
                  className="btn btn-success w-100 mb-2"
                  onClick={() => generatePDF(student)}
                >
                  Generate PDF
                </button>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => generatePdfAndSendEmail(student)}
                >
                  Send Email
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>)
  );
}
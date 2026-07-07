
import React, { useState } from "react";
import jsPDF from "jspdf";

export default function GenerateOfferLetter() {
  const [student, setStudent] = useState({
    name: "Rushi Kawale",
    email: "rushi@example.com",
    position: "Software Engineer",
    package: "8 LPA",
    joiningDate: "2026-08-01",
    location: "Pune"
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("OFFER LETTER", 75, 20);

    doc.setFontSize(12);
    doc.text(`Dear ${student.name},`, 20, 40);
    doc.text(
      `We are pleased to offer you the position of ${student.position}.`,
      20,
      55
    );
    doc.text(`Package : ${student.package}`, 20, 70);
    doc.text(`Location : ${student.location}`, 20, 82);
    doc.text(`Joining Date : ${student.joiningDate}`, 20, 94);
    doc.text("Congratulations! We look forward to working with you.",20,110);

    doc.save(`${student.name}_OfferLetter.pdf`);
  };

  const sendEmail = async () => {
    try {
      const res = await fetch("/api/company/offer/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });

      if (res.ok) {
        alert("Offer letter generation request sent. Email will be delivered by the server.");
      } else {
        alert("Failed to send email.");
      }
    } catch (err) {
      alert("Server error.");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Generate Offer Letter</h3>
        </div>

        <div className="card-body">
          <div className="row g-3">
            {[
              ["Student Name","name"],
              ["Email","email"],
              ["Position","position"],
              ["Package","package"],
              ["Joining Date","joiningDate"],
              ["Location","location"]
            ].map(([label,key])=>(
              <div className="col-md-6" key={key}>
                <label className="form-label">{label}</label>
                <input
                  className="form-control"
                  name={key}
                  value={student[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-success" onClick={generatePDF}>
              Generate PDF
            </button>

            <button className="btn btn-primary" onClick={sendEmail}>
              Generate & Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

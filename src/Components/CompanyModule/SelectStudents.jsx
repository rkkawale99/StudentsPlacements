import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/axios";
import GenerateOfferLetter from "./GenerateOfferLetter";

const getToken = () => localStorage.getItem("token");

export default function SelectStudents() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState([]);


  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("/applications/company");

      const data = res.data.data.filter(
        (item) => item.status === "SELECTED"
      );

      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };
  const [placementResult, setPlacementResult] = useState({
    application : {id : null},
    job : {id : null},
    offerLetter : "",
    joiningDate : ""
  })
   const ConfirmSelection = async () => {
  try {
    for (const applicationId of selected) {

      const student = students.find((s) => s.id === applicationId);

      const body = {
        application: {
          id: applicationId,
        },
        job: {
          id: student.jobId,
        },
        offerLetter: "",
        joiningDate: placementResult.joiningDate,
      };

      await api.post("/placement-results", body);
    }

    alert("Placement results saved successfully.");

    setSelected([]);
    loadStudents();

  } catch (err) {
    console.error(err);
    alert("Failed to save placement results.");
  }
};

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Selected Students</h4>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="">
            <tr>
              <th></th>
              <th>Name</th>
              <th>CGPA</th>
              <th>Job Role</th>
              <th>Applied Date</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() => toggle(s.id)}
                    />
                  </td>

                  <td>
                    {s.firstName} {s.lastName}
                  </td>

                  <td>{s.cgpa}</td>

                  <td>{s.jobRole}</td>

                  <td>
                    {new Date(s.appliedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No selected students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <input hidden={selected.length === 0} type="date" className="form-control mb-3" style={{width : "50%"}} placeholder="Joining Date"   value={placementResult.joiningDate}
  onChange={(e) =>setPlacementResult({ ...placementResult,joiningDate: e.target.value,})}/>
   <button
  className="btn btn-success"
  onClick={ConfirmSelection}
  disabled={selected.length === 0 || !placementResult.joiningDate}
>
  Confirm {selected.length} Selection
</button>
     
    </div>
  );
}
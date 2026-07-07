import React, { useState } from "react";
import Top from "../../Popups/Top";

const initial = [
  {
    id: 1,
    name: "Rushi Kawale",
    branch: "Computer",
    cgpa: 8.72,
    selected: false,
  },
  {
    id: 2,
    name: "Priya Patil",
    branch: "IT",
    cgpa: 9.1,
    selected: false,
  },
  {
    id: 3,
    name: "Amit Sharma",
    branch: "ENTC",
    cgpa: 8.25,
    selected: false,
  },
];

export default function AddStudent({ addStudent }) {
  const [students, setStudents] = useState(initial);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const toggle = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, selected: !student.selected }
          : student
      )
    );
  };

  // Accept Students
  const handleAccept = () => {
    const selectedStudents = students.filter((student) => student.selected);

    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    // Send selected students to parent
    addStudent(selectedStudents);

    // Remove accepted students from request list
    setStudents((prev) => prev.filter((student) => !student.selected));

    setMessage(
      `${selectedStudents.length} ${
        selectedStudents.length === 1 ? "student" : "students"
      } accepted successfully.`
    );

    setShow(true);
  };

  // Reject Students
  const handleReject = () => {
    const selectedStudents = students.filter((student) => student.selected);

    if (selectedStudents.length === 0) {
      alert("Please select at least one student.");
      return;
    }

    // Remove rejected students
    setStudents((prev) => prev.filter((student) => !student.selected));

    setMessage(
      `${selectedStudents.length} ${
        selectedStudents.length === 1 ? "student" : "students"
      } rejected successfully.`
    );

    setShow(true);
  };

  return (
    <div className="container py-4">
      <Top
        show={show}
        setShow={setShow}
        title="Student Request"
        msg={message}
      />

      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Accept Student Requests</h3>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={student.selected}
                          onChange={() => toggle(student.id)}
                        />
                      </td>

                      <td>{student.name}</td>
                      <td>{student.branch}</td>
                      <td>{student.cgpa}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No Pending Requests
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex gap-3 mt-3">
            <button className="btn btn-success" onClick={handleAccept}>
              Accept Candidates
            </button>

            <button className="btn btn-danger" onClick={handleReject}>
              Reject Candidates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
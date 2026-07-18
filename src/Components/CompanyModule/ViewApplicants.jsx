import React, { useEffect, useState } from "react";
import FilterStudents from "./FilterStudents";
import api from "../../utils/axios";

export default function ViewApplicants() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All Branches");
  const [cgpa, setCgpa] = useState("All CGPA");

  useEffect(() => {
    loadApplicants();
  }, []);

  const loadApplicants = async () => {
    try {
      const res = await api.get("/applications/company");
      setData(res.data.data || []);
      console.log(res.data.data);

    } catch (err) {
      console.error(err);
    }
  };

  const filtered = data.filter((student) => {
    // const student = s.studentResponse;
    const name =
      (
        (student.firstName || "") +
        " " +
        (student.lastName || "")
      ).trim() ||
      student.user?.name ||
      "";

    const branch =
      student.department?.departmentName || "";

    const cgpaValue = student.cgpa || 0;

    const searchMatch = name
      .toLowerCase()
      .includes(search.toLowerCase());

    const studentBranch =
      student.department?.departmentName || "";

    const branchMatch =
      branch === "All Branches" ||
      studentBranch === branch;

    const CGPAMatch =
      cgpa === "All CGPA" ||
      cgpaValue >= Number(cgpa.slice(0, -1));

    return searchMatch && branchMatch && CGPAMatch;
  });

  return (
    <>
      <FilterStudents
        search={search}
        setSearch={setSearch}
        branch={branch}
        setBranch={setBranch}
        cgpa={cgpa}
        setCgpa={setCgpa}
      />

      <div className="table-responsive mt-3">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
          {filtered.map((student) => {

  const name = `${student.firstName || ""} ${student.lastName || ""}`.trim();

  return (
    <tr key={student.id}>
      <td>{name}</td>

      <td>{student.department?.departmentName || "-"}</td>

      <td>{student.cgpa ?? "-"}</td>

      <td>
        {student.resumeUrl ? (
          <a
            href={student.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
        ) : (
          <span className="text-muted">
            Not Uploaded
          </span>
        )}
      </td>
    </tr>
  );
})}
          </tbody>
        </table>
      </div>
    </>
  );
}
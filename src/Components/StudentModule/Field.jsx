import React from "react";

const Field = ({
  label,
  name,
  type = "student",
  student,
  editMode,
  handleChange,
  departments = [],
  handleAcademic,
  handleDepartment,
  handleUser,
}) => {



  let field;

  if (editMode) {

   if (type === "department") {

  field = (
    <select
      className="form-select"
      name="department"
      value={student.department?.departmentName || ""}
      onChange={handleDepartment}
    >
      <option value="">Select Department</option>

      {departments.map((dept) => (
        <option key={dept.id} value={dept.departmentName}>
          {dept.departmentName}
        </option>
      ))}
    </select>
  );

} else if (type === "passingYear") {

  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear + 5; year >= 2000; year--) {
    years.push(year);
  }

  field = (
    <select
      className="form-select"
      name={name}
      value={student[name] || ""}
      onChange={handleChange}
    >
      <option value="">Select Passing Year</option>

      {years.map(year => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );

} else {

      let value = "";
      let onChange = handleChange;

      if (type === "academics") {
        value = student.academics?.[name] || "";
        onChange = handleAcademic;
      } else if (type === "user") {
        value = student.user?.[name] || "";
        onChange = handleUser;
      } else {
        value = student[name] || "";
      }

      field = (
        <input
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      );
    }

  } else {

    let value = "";

    if (type === "academics") {
      value = student.academics?.[name];
    } else if (type === "department") {
      value = student.department?.departmentName;
    } else if (type === "user") {
      value = student.user?.[name];
    } else {
      value = student[name];
    }

    field = <div>{value}</div>;
  }

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      {field}
    </div>
  );
};

export default Field;
import React from 'react'

const Field = ({ label, name, company, editMode, handleChange }) => (
    <div className="mb-3">
        <label className="form-label fw-bold">{label}</label>

        {editMode ? (
            <input
                className="form-control"
                name={name}
                value={company[name] || ""}
                onChange={handleChange}
            />
        ) : (
            <div>{company[name]}</div>
        )}
    </div>
);

export default Field

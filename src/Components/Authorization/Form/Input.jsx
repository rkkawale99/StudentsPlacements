import React from 'react'

const Input = ({form, errors, title, danger, handleChange, name, placeholder}) => {
    return (
        <div className="col-md-6">
            <label className="form-label text-light">{title}{danger && <span className="text-danger">*</span>}</label>
            <input
                className={`form-control bg-dark text-light border-secondary ${errors ? "is-invalid" : ""}`}
                name={name}
                value={form}
                onChange={handleChange}
                placeholder={placeholder}
                required
            />
            <div className="invalid-feedback">{errors}</div>
        </div>
    )
}

export default Input

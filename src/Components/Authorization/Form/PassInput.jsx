import React from 'react'

const PassInput = ({form, errors, title, danger, handleChange, name, showPassword, setShowPassword}) => {
    return (
        <div className="col-md-6">
            <label className="form-label text-light">{title} {danger && <span className="text-danger">*</span>}</label>
            <div className="input-group">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control bg-dark text-light border-secondary ${errors ? "is-invalid" : ""}`}
                    name={name}
                    value={form}
                    onChange={handleChange}
                    required
                />

                <button type="button" className="btn btn-dark border-secondary" onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
            </div>
            {errors && (
                <div className="text-danger small mt-1">
                    {errors}
                </div>
            )}
        </div>
    )
}

export default PassInput

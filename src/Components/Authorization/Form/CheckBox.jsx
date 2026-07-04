import React from 'react'

const CheckBox = ({checked, onChange}) => {
    return (

        <div className="col-12">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    name="agree"
                    checked={checked}
                    onChange={onChange}
                    required
                />
                <label htmlFor="agree" className="form-check-label text-light">
                    I agree to the Terms & Conditions
                </label>
            </div>
        </div>
    )
}

export default CheckBox

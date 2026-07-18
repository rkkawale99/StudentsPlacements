import React from 'react'

const OptionInpu = ({title, value, onChange, Data, msg, name}) => {
    return (
        <div className="col-md-6">
            <label className="form-label text-light">{title}</label>
            <select
                className="form-select bg-dark text-light border-secondary"
                name={name}
                value={value}
                onChange={onChange}
                required
            >
                <option value="">{msg}</option>
               { Data.map((data)=>{
                    return (<option>{data}</option>)
                })}
            </select>
        </div>
    )
}

export default OptionInpu

import React, { useState } from 'react'

const CategoryRadioInput = (props) => {
  const [catValue, setCatValue] = useState(null)
  const {
    input: { value, onChange },
    meta: { touched, error, warning },
  } = props
  const handleChange = (value) => {
    onChange(value)
    setRvalue(value)
  }
  return (
    <>
    {["tl", "eur", "usd"].map(item => (
      <div className="form-check form-check-inline">
        <input
          name={props.name}
          id={item}
          className={
            touched
              ? (error && 'form-check-input is-invalid') ||
                (!error && 'form-check-input is-valid')
              : 'form-check-input'
          }
          type="checkbox"
          value={item}
          onChange={(e) => handleChange(e.target.value)}
          checked={rvalue === item }
        />
        <label htmlFor={item} className="form-check-label">
          {item.toUpperCase()}
        </label>
      </div>
    )) }
      {touched &&
        ((error && (
          <div className="text-danger">
            <small>{error}</small>
          </div>
        )) ||
          (warning && (
            <div className="text-success">
              <small>{warning}</small>
            </div>
          )))}
    </>
  )
}
export default CurrencyRadioInput

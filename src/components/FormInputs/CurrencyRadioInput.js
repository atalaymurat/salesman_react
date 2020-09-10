import React, { useState, useEffect } from 'react'

const CurrencyRadioInput = (props) => {
  const [rvalue, setRvalue] = useState(null)
  useEffect(() => {
    setRvalue(props.init)

  }, [props.init])

  const {
    input: {  onChange },
    meta: { touched, error, warning },
  } = props
  const handleChange = (val) => {
    onChange(val)
    setRvalue(val)
  }
  return (
    <>
      {['tl', 'eur', 'usd'].map((item, i) => (
        <div className="form-check form-check-inline" key={i}>
          <input
            name={props.name}
            id={item}
            className={
              touched
                ? (error && 'form-check-input is-invalid') ||
                  (!error && 'form-check-input is-valid')
                : 'form-check-input'
            }
            type="radio"
            value={item}
            onChange={(e) => handleChange(e.target.value)}
            checked={rvalue === item}
          />
          <label htmlFor={item} className="form-check-label">
            {item.toUpperCase()}
          </label>
        </div>
      ))}
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

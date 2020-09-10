import React from 'react'

const RowInput = (props) => {
  const {
    input: { value, onChange },
    meta: { touched, error, warning },
  } = props
  return (
    <div>
      <div className="form-group row">
        <label htmlFor={props.id} className="col-sm-2 col-form-label">
          {props.label}
        </label>
        <div className="col-sm-10">
          <input
            name={props.name}
            id={props.id}
            placeholder={props.label}
            className={
              touched
                ? (error && 'form-control is-invalid') ||
                  (!error && 'form-control is-valid')
                : 'form-control'
            }
            type={props.type}
            value={value}
            onChange={onChange}
          />
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
        </div>
      </div>
    </div>
  )
}
export default RowInput

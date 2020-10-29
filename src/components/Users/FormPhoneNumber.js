import React from 'react'
import PhoneInput from 'react-phone-number-input'
import PropTypes from 'prop-types'
import { getIn } from 'formik'

const FormPhoneNumber = (props) => {
  const {
    name,
    value,
    formik: { errors, handleBlur, setFieldValue, touched },
    label,
    onChange,
    id,
    placeholder,
    init,
  } = props

  const setValue = (num) => {
    setFieldValue(name, num)
    if (onChange !== null) {
      onChange(num)
    }
  }
  return (
    <div className="form-group row">
      <label htmlFor={id} className="col-sm-2 col-form-label col-form-label-lg">
        {label}
      </label>
      <div className="col">
        <PhoneInput
          id={id}
          placeholder={placeholder}
          name={name}
          value={init || value}
          onBlur={handleBlur}
          onChange={setValue}
          international
          defaultCountry="TR"
          className={
            getIn(errors, name)
              ? 'form-control is-invalid'
              : getIn(touched, name)
              ? 'form-control is-valid'
              : 'form-control'
          }
        />
        {name === "phone.mobile" && !getIn(errors, name)  && (
          <small>Bu alan ilanlarınızda öncelikli iletişim telefonu olarak gösterilecektir</small>
        )}
        {getIn(errors, name) ? (
          <small className="text-danger">{getIn(errors, name)}</small>
        ) : null}
      </div>
    </div>
  )
}
FormPhoneNumber.propTypes = {
  field: PropTypes.any,
  onChange: PropTypes.func,
  label: PropTypes.string,
}

FormPhoneNumber.defaultProps = {
  className: '',
  label: '',
  onChange: null,
}

export default FormPhoneNumber
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
const eye = <FontAwesomeIcon icon={faEye} />

//Field level validation
export const required = (value) =>
  value || typeof value === 'number' ? undefined : 'Bu alanı doldurmalısınız.'
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'E-posta geçerli değil.'
    : undefined


export const minLength = (min) => (value) =>
  value && value.length < min ? `En az ${min} karakter olmalı.` : undefined
export const minLength6 = minLength(6)
export const minLength4 = minLength(4)




export default class StandartInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passShow: false,
    }
    this.togglePassShow = this.togglePassShow.bind(this)
  }

  togglePassShow() {
    this.setState({ passShow: this.state.passShow ? false : true })
    console.log('pass show', this.state.passShow)
  }
  componentUnmount() {
    this.setState({ passShow: false })
  }
  render() {
    const {
      input: { value, onChange },
      meta: { touched, error, warning },
    } = this.props
    return (
      <div>
        <div className="form-label-group">
          <input
            name={this.props.name}
            id={this.props.id}
            placeholder={this.props.label}
            className={
              touched
                ? (error && 'form-control is-invalid') ||
                  (!error && 'form-control is-valid')
                : 'form-control'
            }
            type={this.state.passShow ? 'text' : this.props.type}
            value={value}
            onChange={onChange}
          />
          {touched &&
            ((error && <div className="invalid-feedback">{error}</div>) ||
              (warning && <div className="valid-feedback">{warning}</div>))}
          <label htmlFor={this.props.id}>
            {this.props.label}

            {value.length > 0 && this.props.type === 'password' && (
              <i className="password float-right" onClick={this.togglePassShow}>
                {eye}
              </i>
            )}
          </label>
        </div>
      </div>
    )
  }
}

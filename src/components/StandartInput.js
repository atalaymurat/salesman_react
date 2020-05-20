import React, { Component } from 'react'

//Field level validation
export const required = (value) =>
  value || typeof value === 'number' ? undefined : 'Bu alanı doldurmalısınız.'
export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'E-posta geçerli değil.'
    : undefined

export const minValue = (min) => (value) =>
  value && value < min ? `En az ${min} karakter içermeli..` : undefined
export const minValue18 = minValue(18)

export const minLength = (min) => (value) =>
  value && value.length < min ? `En az ${min} karakter olmalı.` : undefined
export const minLength6 = minLength(6)

export default class StandartInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ clicked: true })
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
              this.state.clicked
                ? (error && 'form-control is-invalid') ||
                  (!error && 'form-control is-valid')
                : 'form-control'
            }
            type={this.props.type}
            value={value}
            onChange={onChange}
            onClick={() => {
              this.handleClick()
            }}
          />
          {this.state.clicked &&
            ((error && <div class="invalid-feedback">{error}</div>) ||
              (warning && <span>{warning}</span>))}
          <label htmlFor={this.props.id}>{this.props.label}</label>
        </div>
      </div>
    )
  }
}

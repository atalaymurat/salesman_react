import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'

const AutoSuggestBrands = (props) => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])

  // Logic to filter suggestions
  const getSuggestions = (value, list) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : list.filter(
          (item) => item.toLowerCase().slice(0, inputLength) === inputValue
        )
  }
  // Theme setting for bootstrap classes not working well
  const theme = {
    container: 'autosuggest',
    input: props.meta.touched
      ? (props.meta.error && 'form-control form-control-lg is-invalid') ||
        (!props.meta.error && 'form-control form-control-lg is-valid')
      : 'form-control form-control-lg',
    suggestionsContainer: 'dropdown',
    suggestionsList: '',
    suggestion: 'dropdown-item',
    suggestionHighlighted: 'active',
  }

  const renderSuggestion = (suggestion) => <span>{suggestion}</span>
  const getSuggestionValue = (suggestion) => suggestion

  const onChange = (e, { newValue }) => {
    const newValueLowcase = newValue.toLowerCase()
    setValue(newValueLowcase)
    // Passing prop to redux-form onChange
    props.input.onChange(newValueLowcase)
  }
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (!value) {
      setSuggestions([])
      return
    }
    try {
      const res = await axios.get(`/brands/${value}`)
      const list = res.data.map((item) => item.name)
      setSuggestions(getSuggestions(value, list).slice(0, 5))
    } catch (err) {
      setSuggestions([])
    }
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }

  const inputProps = {
    value: props.input.value,
    onChange: onChange,
    touched: props.meta.touched,
    error: props.meta.error,
    warning: props.meta.warning,
    placeholder: 'Marka Seçiniz...',
  }
  const renderInput = (inputProps) => (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...inputProps}
      id={props.id}
      touched="false"
      />
      {props.meta.touched ?
        ((props.meta.error && (
          <div className="invalid-feedback">{props.meta.error}</div>
        )) ||
          (props.meta.warning && (
            <div className="valid-feedback">{props.meta.warning}</div>
          ))): null}
    </div>
  )

  return (
    <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={(event, { suggestion, method }) => {
            if (method === 'enter') {
              event.preventDefault()
            }
            setValue(suggestion)
          }}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
          highlightFirstSuggestion={false}
          renderInputComponent={renderInput}
        />
    </>
  )
}

export default AutoSuggestBrands

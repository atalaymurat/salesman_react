import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const PlacesInput = ({meta, input}) => {

  return (
    <PlacesAutocomplete
      value={input.value}
      onChange={input.onChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
           <label htmlFor="location">Makinanın Bulunduğu Şehir</label>
          <input
            {...getInputProps({
              placeholder: 'Adress Ara ...',
              id:'location',
              className: 'location-search-input form-control',
            })}
          />
          {meta.touched && meta.error && <small className="text-danger">{meta.error}</small>}
          <div>
            {loading ? <div>Yükleniyor</div> : null}
            {suggestions.map((suggestion, i) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#0275d8', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' }
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={i}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}


export default PlacesInput

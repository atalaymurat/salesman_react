import countries from 'i18n-iso-countries'
countries.registerLocale(require('i18n-iso-countries/langs/tr.json'))

export const getCountryAlpha2Code = (address) => {
  if (address) {
    let country = address.split(',')
    if (country.length >= 1) {
      country = country[country.length - 1]
    }
    return countries.getAlpha2Code(country.trim(), 'tr')

  } else {
    return ''
  }
}

// content userın mı değil mi check etmek için kullanılmıyor
export const checkOwner = (userId, contentId) => {
  if (userId === contentId) {
    return true
  } else {
    return false
  }
}
export const getCatPath = (cat, catList) => {
  let splitedArr = cat.path ? cat.path.split(',') : []
  let fullPath = ''
  if (!cat.path) {
    fullPath = cat.name + '/'
  } else {
    splitedArr.map((i) => {
      if (i) {
        fullPath = fullPath.concat(
          catList.find((c) => c._id === i) &&
            catList.find((c) => c._id === i).name + '/',
          cat.name
        )
      }
      return fullPath
    })
  }
  return fullPath
}

export const formatAmountDisplay = (value) => {
  if (!value) return
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
export const formatAmount = (value) => {
  if (!value) return
  return value
    .toString()
    .replace(/[,.$€£]|[^0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const normalizeAmount = (value) => {
  return value.toString().replace(/ |,|\.|/g, '')
}

export const truncateStr = (str, n) => {
  if (str) {
    if (str.length > n) {
      return str.slice(0, n) + '...'
    } else {
      return str
    }
  } else {
    return ''
  }
}

export const maxLength = (max) => (value) =>
  value && value.length > max ? `En fazla ${max} karakter olabilir` : undefined
export const maxLength4 = maxLength(4)

export const maxValue = (max) => (value) =>
  value && value > max ? `En çok ${max} olabilir..` : undefined
export const maxYear = maxValue(new Date().getFullYear() + 1)

export const minValue = (min) => (value) =>
  value && value < min ? `En az ${min} değerinde olabilir..` : undefined
export const minValue1800 = minValue(1800)
export const minValue1 = minValue(1)
export const requiredSelect = (value) =>
  value || typeof value === 'number' ? undefined : 'Bir seçim yapılmalısınız.'

export const verifyUserToPostLead = (user) => {
  if (
    user.local.email_verified &&
    user.name.first &&
    user.name.last &&
    user.phone.mobile
  )
    return true
  else return false
}

export const pad = (n) => {
  return n < 10 ? '0' + n : n
}

export const formingDate = (date) =>
  date
    ? `${pad(new Date(date).getDate())}/${pad(
        new Date(date).getMonth() + 1
      )}/${new Date(date).getFullYear()} ${pad(
        new Date(date).getHours()
      )}:${pad(new Date(date).getMinutes())}`
    : ''

export const formatCurrency = (c) => {
  if (c === 'eur') return '€'
  if (c === 'usd') return '$'
  if (c === 'tl') return '₺'
  return '-'
}

function getTime(time) {
  let currentTime = new Date()
  let hhNow = currentTime.getHours()
  let mmNow = currentTime.getMinutes()
  let hh = time.getHours()
  let mm = time.getMinutes()
  let hours = hhNow - hh

  if (hhNow - hh == 0 ) {
      let minutes = mmNow-mm
      if (minutes > 1) {
          return `${minutes} minutes ago`
      }
      return `${minutes} minute ago`
  }

  if (hours > 1) {
      return `${hours} hours ago`
  }
  return `${hours} hour ago`
}

const getCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

module.exports = {
  getTime,
  getCurrency
}
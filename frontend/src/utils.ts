
export const vibrate = () => {
  // vibrate for 200ms
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(200)
  }
}



export const nullLast = (a, b) => {
  // equal items sort equally
  if (a === b) {
    return 0
  }
  // nulls sort after anything else
  else if (a === null) {
    return 1
  } else if (b === null) {
    return -1
  }
  // otherwise, if we're ascending, lowest sorts first
  return a < b ? -1 : 1
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseError = (error: any) => {
  if (error instanceof Error) {
    return error.message
  }
  if (error?.message && typeof error.message === 'string') {
    return error.message
  }
  return JSON.stringify(error)
}

export const jsonToFormData = (json: Record<string, string>) => {
  const formBody: string[] = []
  for (const property in json) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(json[property])
    formBody.push(encodedKey + '=' + encodedValue)
  }
  return formBody.join('&')
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the parameters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

export function formPost(
  path,
  params: Record<string, string>,
  method = 'post'
) {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form')
  form.method = method
  form.action = path

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const hiddenField = document.createElement('input')
      hiddenField.type = 'hidden'
      hiddenField.name = key
      hiddenField.value = params[key]

      form.appendChild(hiddenField)
    }
  }

  document.body.appendChild(form)
  form.submit()
}

export function lengthLimited(text: string, length = 20) {
  if (text.length > length) {
    return text.substring(0, length) + '...'
  }
  return text
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return d
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function toInternationalPhone(phone: string) {
  return '+886' + phone.slice(1)
}

export function isTWPhone(phone: string) {
  if (phone === undefined) {
    return false
  }
  return !!phone.match(/^09[0-9]{8}$/)
}


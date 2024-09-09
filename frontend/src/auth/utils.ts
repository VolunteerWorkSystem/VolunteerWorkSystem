export function isJwtExpired(exp) {
  if (Date.now() >= exp * 1000) {
    return true
  }
  return false
}


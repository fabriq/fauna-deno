let handleDeprecation = msg => {
  console.warn(msg)
}

export function setDeprecationHandler(fn) {
  handleDeprecation = fn
}

export default function deprecate(fn, msg) {
  var warned = false
  function deprecated() {
    if (!warned) {
      handleDeprecation(msg)
      warned = true
    }
    return fn.apply(this, arguments)
  }

  return deprecated
}

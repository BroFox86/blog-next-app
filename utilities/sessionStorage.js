export function saveState(state) {
  const serializedState = JSON.stringify(state)

  sessionStorage.setItem('state', serializedState)
}

export function loadState() {
  const serializedState = sessionStorage.getItem('state')

  if (serializedState !== null) {
    return JSON.parse(serializedState)
  } else {
    return null
  }
}

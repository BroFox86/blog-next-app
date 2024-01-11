export function saveState(state) {
  const serializedState = JSON.stringify(state)

  sessionStorage.setItem('state', serializedState)
}

export function loadState() {
  if (typeof window !== 'undefined') {
    const serializedState = sessionStorage.getItem('state')

    return JSON.parse(serializedState)
  }
}

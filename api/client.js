export async function fetchData(endpoint, method, body) {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(endpoint, config)

    if (!response.ok) {
      throw Error(response.message)
    }

    if (response.status !== 204) {
      return await response.json()
    }

  } catch (error) {

    throw Error(error)
  }
}

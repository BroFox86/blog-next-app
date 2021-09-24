export function formatDate(isoDate: string, isShort?: boolean) {
  let options = {}
  let formatter

  if (!isShort) {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  } else {
    options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit"
    }
  }

  formatter = new Intl.DateTimeFormat("en-US", options)

  return formatter.format(new Date(isoDate))
}

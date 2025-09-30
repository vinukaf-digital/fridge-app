export function convertDateForInput(dateString: string) {
  return dateString.replace(/\//g, '-');
}

export function convertDateForAPI(dateString: string) {
  return dateString.replace(/-/g, '/');
}
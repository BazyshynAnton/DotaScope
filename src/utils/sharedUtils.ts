/**
 * Helper function to fetch data from a given URL
 * and parse the response as JSON.
 *
 * This function sends a GET request to the specified URL,
 * handles the response, and returns the parsed JSON data
 * if the response is successful. If an error occurs,
 * it returns the error message or a string indicating the failure.
 *
 * @template T The type of the data expected in the response.
 * @param url The URL to fetch data from.
 * @returns `Promise<T | Error>`
 * A promise that resolves to the parsed JSON data of type `T`,
 * or an `Error` object if the fetch operation fails.
 */
export async function fetchHelper<T>(
  url: string,
  cache: RequestCache = 'force-cache',
): Promise<T | Error> {
  const response = await fetch(url, {
    cache,
  })

  if (!response.ok) {
    return new Error(`Failed to fetch using URL: ${url}`)
  }

  return await response.json()
}

export function timeAgo(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(seconds / 3600)
  const days = Math.floor(seconds / 86400)

  if (seconds < 60) {
    return seconds === 1 ? 'A second ago' : `${seconds} seconds ago`
  }
  if (minutes < 60) {
    return minutes === 1 ? 'A minute ago' : `${minutes} minutes ago`
  }
  if (hours < 24) {
    return hours === 1 ? 'An hour ago' : `${hours} hours ago`
  }
  return `${days} day${days > 1 ? 's' : ''} ago`
}

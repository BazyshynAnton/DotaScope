/**
 * Returns string that tells how much time ago event occurred
 *
 * @param seconds Seconds
 * @returns {string}
 */
export function timeAgo(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);

  if (seconds < 60) {
    return seconds === 1 ? 'A second ago' : `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return minutes === 1 ? 'A minute ago' : `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return hours === 1 ? 'An hour ago' : `${hours} hours ago`;
  }
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

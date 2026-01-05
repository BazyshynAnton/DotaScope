/**
 * Checks whether env string or not
 *
 * @param env Environment variable
 * @returns {string}
 */
export function envHelper(env: string | undefined): string {
  if (typeof env === 'string') {
    return env;
  }

  return '';
}

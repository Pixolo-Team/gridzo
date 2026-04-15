/**
 * Normalizes URL values by ensuring they include a protocol.
 */
export function normalizeUrlService(urlValue: string): string | undefined {
  const trimmedUrlValue = urlValue.trim();

  if (!trimmedUrlValue) {
    return undefined;
  }

  if (/^https?:\/\//i.test(trimmedUrlValue)) {
    return trimmedUrlValue;
  }

  return `https://${trimmedUrlValue}`;
}

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

/**
 * Ensures php_code starts with a supported opening tag.
 */
export function normalizePhpCode(phpCodeData: string): string {
  const trimmedPhpCodeData = phpCodeData.trim();

  if (
    trimmedPhpCodeData.startsWith("<?php") ||
    trimmedPhpCodeData.startsWith("<?")
  ) {
    return phpCodeData;
  }

  return `<?php\n${phpCodeData}`;
}

/**
 * Converts an optional ISO date into a human-friendly sync label for project cards.
 */
export function getLastSyncLabelService(updatedAtData?: string): string {
  if (!updatedAtData) {
    return "Last Sync: Just now";
  }

  const parsedDateData = new Date(updatedAtData);

  if (Number.isNaN(parsedDateData.getTime())) {
    return "Last Sync: Just now";
  }

  const minutesDifferenceData = Math.max(
    0,
    Math.floor((Date.now() - parsedDateData.getTime()) / 60000),
  );

  if (minutesDifferenceData < 1) {
    return "Last Sync: Just now";
  }

  if (minutesDifferenceData < 60) {
    return `Last Sync: ${minutesDifferenceData} minute${minutesDifferenceData === 1 ? "" : "s"} ago`;
  }

  const hoursDifferenceData = Math.floor(minutesDifferenceData / 60);

  if (hoursDifferenceData < 24) {
    return `Last Sync: ${hoursDifferenceData} hour${hoursDifferenceData === 1 ? "" : "s"} ago`;
  }

  const daysDifferenceData = Math.floor(hoursDifferenceData / 24);
  return `Last Sync: ${daysDifferenceData} day${daysDifferenceData === 1 ? "" : "s"} ago`;
}

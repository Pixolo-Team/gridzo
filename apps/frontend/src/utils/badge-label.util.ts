/**
 * Gets the badge initials from the provided badge name
 */
export function getBadgeLabelUtil(badgeName: string): string {
  return badgeName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((badgeNameItem) => badgeNameItem.charAt(0).toUpperCase())
    .join("");
}

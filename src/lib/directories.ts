/** Account directories, Role dependant */
export const availableDirectories = {
  account: "My account",
  myTrips: "My trips",
  venues: "Manage venues",
  bookings: "Manage bookings",
  calendar: "Calendar",
  metrics: "Revenue",
} as const;

/** Account directory keys */
export type DirectoryKey = keyof typeof availableDirectories;

export function convertToHumanReadable(seconds) {
  const days = Math.floor(seconds / 86400);
  seconds %= 86400; // Remaining seconds after extracting days
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600; // Remaining seconds after extracting hours
  const minutes = Math.floor(seconds / 60);
  seconds %= 60; // Remaining seconds after extracting minutes

  // Pad with leading zeros
  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedHours} hours, ${paddedMinutes} minutes, ${paddedSeconds} seconds`;
}

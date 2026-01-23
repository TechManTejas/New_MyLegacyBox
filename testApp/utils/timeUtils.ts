/**
 * Returns a greeting based on the current hour of the day.
 * @param hour The current hour (0-23). If not provided, the current local hour is used.
 * @returns A string greeting ("Good morning", "Good afternoon", or "Good evening").
 */
export const getTimeGreeting = (hour?: number): string => {
  const currentHour = hour !== undefined ? hour : new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

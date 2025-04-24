export const getTuesdaysAndThursdaysFromNow = (endDate: Date): string[] => {
  const dates: string[] = [];
  const startDate = new Date();
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    // 2 = Tuesday, 4 = Thursday
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 2 || dayOfWeek === 4) {
      // Format as YYYY-DD-MM
      const year = currentDate.getFullYear();
      const day = currentDate.getDate().toString().padStart(2, "0");
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      dates.push(`${year}-${day}-${month}`);
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const createMemoId = (date: string, time: string, spotId?: number) => {
  return `ipe-canoe-${date}-${time}${spotId ? `-${spotId}` : ""}`;
};

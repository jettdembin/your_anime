const getEmoji = (percent: number | undefined) => {
  if (!percent) return;
  switch (true) {
    case percent >= 75:
      return "😍";
    case percent < 75 && percent >= 50:
      return "😐";
    case percent < 50:
      return "😒";
    default:
      "😶";
  }
};
const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutID: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function convertTimeUntilAiring(timeUntilAiring: number): string {
  const days = Math.floor(timeUntilAiring / (24 * 60 * 60)); // Convert seconds to days
  const hours = Math.floor((timeUntilAiring % (24 * 60 * 60)) / (60 * 60)); // Convert remaining seconds to hours

  let result = "";
  if (days > 0) {
    result += `${days} days `;
  }
  if (hours > 0) {
    result += `${hours} hours`;
  }
  return result;
}

function getMonthName(monthNumber: number | undefined): string | null {
  if (monthNumber) {
    // Array of month names
    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Adjust for zero-indexed array (January is 0, December is 11)
    let adjustedMonthNumber: number = monthNumber - 1;

    return monthNames[adjustedMonthNumber];
  } else return null;
}

function showModal(modalId: string): void {
  const modalElement = document.getElementById(
    modalId
  ) as HTMLDialogElement | null;
  if (modalElement) {
    modalElement.showModal();
  }
};

export { convertTimeUntilAiring, debounce, getEmoji, getMonthName, showModal };


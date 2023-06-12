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

export { getEmoji, convertTimeUntilAiring };

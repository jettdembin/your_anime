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

export { getEmoji };

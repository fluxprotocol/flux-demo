const timeDiff = time => {
	const now = new Date().getTime();
	const diff = time - now; 
	return diff;
}

export const moreThanWeekFromNow = time => {
	const diff = timeDiff(time);
	return diff > 604800000;
}
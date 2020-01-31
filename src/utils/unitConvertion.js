import { GREEN, YELLOW, RED, WHITE } from "../constants"

export const daiToDollars = (num) => {
	return (num / 10 ** 17).toFixed(2)
}

export const dollarsToDai = (num) => {
	return (num * 10 ** 17).toFixed(2)
}

export const yoctoToNear = (num) => {
	return (num / 10 ** 23)
	// return (num / 10 ** 23).toFixed(2)
}

export const nearToYocto = (num) => {
	return (num * 10 ** 23).toFixed(2)
}

export const toEarnings = (order) => {
	if (order) {
		return daiToDollars(order.amount / order.price * 100);
	} 
	return 0;
} 

export const fromPayoutDistribution = (payoutDistribution) => {
	let result;
	switch(payoutDistribution[0]) {
		case 0:
			result = "yes";
			break;
		case 10000:
			result = "no"
			break;
		case 5000:
			result = "invalid";
			break;
	}
	return result;
}

export const allowanceToColor = (yocto) => {
	if (yocto === null) {
		return WHITE
	}								 
	else if (yocto >= 50000000000000000) {
		return GREEN
	}								 
	else if (yocto < 50000000000000000) {
		return YELLOW
	}
	else {
		return RED
	}		
}
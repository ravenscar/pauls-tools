export const convertToHex = (input: string) => {
	let output = '';

	for (const c of input) {
		output = output + c.charCodeAt(0).toString(16).padStart(2, '0');
	}

	return output;
};

export const convertFromHex = (input: string) => {
	let output = '';
	let buffer = '';

	for (const c of input) {
		if (!Number.isNaN(parseInt(c, 16))) {
			buffer = buffer + c;
		}
		if (buffer.length === 2) {
			const c = String.fromCharCode(parseInt(buffer, 16));
			output = output + c;
			buffer = '';
		}
	}

	return output;
};

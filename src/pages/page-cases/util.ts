export const getParts = (raw: string) => {
	const stripped = raw.replace(/\s/g, '');
	if (stripped.length === 0) {
		return [];
	}

	// check if first char is non-alpha like _
	const flMatch = stripped[0].match(/[A-Za-z]/);

	let prefix: string;
	let meat: string;
	if (!flMatch) {
		prefix = stripped[0];
		meat = stripped.slice(1);
	} else {
		prefix = '';
		meat = stripped;
	}

	let bits: string[];

	if (meat.includes('_')) {
		bits = meat.split('_');
	} else if (meat.includes('-')) {
		bits = meat.split('-');
	} else if (meat.includes('.')) {
		bits = meat.split('.');
	} else {
		bits = meat
			.replace(/([A-Z])/g, ' $1')
			.split(' ')
			.filter(Boolean);
	}

	bits = bits.map(b => b.toLocaleLowerCase());
	bits[0] = `${prefix}${bits[0]}`;

	return bits;
};

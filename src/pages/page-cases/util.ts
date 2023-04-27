export const getParts = (raw: string) => {
	const trimmed = raw.trim().replace(/\s+/g, ' ');
	if (trimmed.length === 0) {
		return [];
	}

	// check if first char is non-alpha like _
	const flMatch = trimmed[0].match(/[A-Za-z]/);

	let prefix: string;
	let meat: string;
	if (!flMatch) {
		prefix = trimmed[0];
		meat = trimmed.slice(1);
	} else {
		prefix = '';
		meat = trimmed;
	}

	let bits: string[];

	if (meat.includes('_')) {
		bits = meat.split('_');
	} else if (meat.includes('-')) {
		bits = meat.split('-');
	} else if (meat.includes(' ')) {
		bits = meat.split(' ');
	} else if (meat.includes('/')) {
		bits = meat.split('/');
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

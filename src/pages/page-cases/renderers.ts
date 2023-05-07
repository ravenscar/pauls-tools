type TRenderer = (parts: string[]) => {
	name: string;
	value: string;
};

const flatRenderer: TRenderer = parts => {
	return {
		name: 'flat',
		value: parts.join(''),
	};
};

const kebabRenderer: TRenderer = parts => {
	return {
		name: 'kebab-case',
		value: parts.join('-'),
	};
};

const snakeRenderer: TRenderer = parts => {
	return {
		name: 'snake_case',
		value: parts.join('_'),
	};
};

const camelRenderer: TRenderer = parts => {
	const upperParts = parts.map((p, i) => {
		if (!p || i === 0) {
			return p;
		}

		const first = p[0].toUpperCase();
		const rest = p.slice(1);

		return `${first}${rest}`;
	});
	return {
		name: 'camelCase',
		value: upperParts.join(''),
	};
};

const pascalRenderer: TRenderer = parts => {
	const upperParts = parts.map(p => {
		if (!p) {
			return p;
		}

		const first = p[0].toUpperCase();
		const rest = p.slice(1);

		return `${first}${rest}`;
	});
	return {
		name: 'PascalCase',
		value: upperParts.join(''),
	};
};

const constantCase: TRenderer = parts => {
	return {
		name: 'CONSTANT_CASE',
		value: parts.join('_').toLocaleUpperCase(),
	};
};

const dotCase: TRenderer = parts => {
	return {
		name: 'dot.case',
		value: parts.join('.'),
	};
};

const pathCase: TRenderer = parts => {
	return {
		name: 'path/case',
		value: parts.join('/'),
	};
};

const lowerCase: TRenderer = parts => {
	return {
		name: 'lower case',
		value: parts.join(' '),
	};
};

const upperCase: TRenderer = parts => {
	return {
		name: 'UPPER CASE',
		value: parts.join(' ').toLocaleUpperCase(),
	};
};

const titleCase: TRenderer = parts => {
	const upperParts = parts.map(p => {
		if (!p) {
			return p;
		}

		const first = p[0].toUpperCase();
		const rest = p.slice(1);

		return `${first}${rest}`;
	});
	return {
		name: 'Title Case',
		value: upperParts.join(' '),
	};
};

export const renderers: TRenderer[] = [
	flatRenderer,
	kebabRenderer,
	snakeRenderer,
	camelRenderer,
	pascalRenderer,
	constantCase,
	dotCase,
	pathCase,
	lowerCase,
	upperCase,
	titleCase,
];

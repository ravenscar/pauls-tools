import jsonStableStringify from 'json-stable-stringify';

export type ParseMode = typeof parseModes[number]['key'];

export const parseModes = [
	{key: 'JSON', display: 'JSON', prismVal: 'json'},
	{key: 'JS', display: 'Javascript', prismVal: 'js'},
	{key: 'TS', display: 'TypeScript', prismVal: 'ts'},
	{key: 'CSS', display: 'CSS', prismVal: 'css'},
	{key: 'SCSS', display: 'SCSS', prismVal: 'scss'},
	{key: 'JSX', display: 'JSX', prismVal: 'jsx'},
	{key: 'TSX', display: 'TSX', prismVal: 'tsx'},
	{key: 'GQL', display: 'GraphQL', prismVal: 'graphql'},
	{key: 'SQL', display: 'SQL', prismVal: 'sql'},
	{key: 'BASH', display: 'Bash', prismVal: 'bash'},
	{key: 'MARKDOWN', display: 'Markdown', prismVal: 'markdown'},
	{key: 'PYTHON', display: 'Python', prismVal: 'python'},
	{key: 'EVAL', display: '⚠️Unsafe Eval⚠️', prismVal: 'json'},
] as const;

export const parseLanguageString = (
	raw: string | undefined,
	parseMode: ParseMode,
) => {
	let out = '';

	if (raw) {
		try {
			switch (parseMode) {
				case 'JSON': {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
					const parsed = JSON.parse(raw);
					out = jsonStableStringify(parsed, {space: 2});
					break;
				}

				case 'EVAL': {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,no-eval
					const parsed = eval(`(${raw})`);
					out = jsonStableStringify(parsed, {space: 2});
					break;
				}

				default: {
					out = raw;
				}
			}
		} catch {
			out = raw;
		}
	}

	return out;
};

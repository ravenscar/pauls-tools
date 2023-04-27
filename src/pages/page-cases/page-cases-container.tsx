import React, {useEffect} from 'react';
import {useSerialize} from '../../storage/cache';
import {getParts} from './util';
import {PageCasesPresentational} from './page-cases-presentational';

export const PageCasesContainer = () => {
	const [input, setInput] = React.useState('');
	const [parts, setParts] = React.useState<string[]>([]);

	useEffect(() => {
		setParts(getParts(input));
	}, [input]);

	useSerialize('/cases', {raw: input}, {raw: setInput});

	return (
		<PageCasesPresentational {...{parts, input: input, setInput: setInput}} />
	);
};

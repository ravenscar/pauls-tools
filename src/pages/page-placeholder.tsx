import React from 'react';

import styled from '@emotion/styled';

const PageContent = styled.div`
	margin: 10px;
	max-width: 1300px;
	margin: auto;
`;

const Highlight = styled.span`
	color: ${props => props.theme.colors.highlight};
	background-color: ${props => props.theme.colors.highlightBackground};
	padding-left: 2px;
	padding-right: 2px;
`;

const Placeholder = ({role}: {role: string}) => (
	<PageContent>
		<p>
			This is a placeholder page for <Highlight>{role}</Highlight>.
		</p>
	</PageContent>
);

export default Placeholder;

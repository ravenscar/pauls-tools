import styled from '@emotion/styled';

export const Column = styled.div<{flex?: number}>`
	display: flex;
	flex-direction: column;
	gap: 10px;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Row = styled.div<{flex?: number}>`
	display: flex;
	flex-direction: row;
	gap: 10px;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Cell = styled.div<{flex?: number}>`
	display: flex;
	flex-direction: row;
	gap: 10px;
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const Bad = styled.span`
	color: ${props => props.theme.colors.error};
`;

export const Area = styled.textarea<{'min-height'?: string; flex?: number}>`
	resize: none;
	tab-size: 2;
	${props => (props['min-height'] ? `min-height: ${props['min-height']};` : '')}
	${props => (props['flex'] ? `flex: ${props['flex']};` : '')}
`;

export const ButtonBase = styled.div`
	text-align: center;
	padding: 10px;
	border: 10px;
	cursor: pointer;
`;

export const Button = styled.div<{selected?: boolean}>`
	background-color: ${props =>
		props.selected ? props.theme.colors.text2 : props.theme.colors.text};
	color: ${props =>
		props.selected
			? props.theme.colors.background2
			: props.theme.colors.background};

	&:hover {
		background-color: ${props => props.theme.colors.text2};
		color: ${props => props.theme.colors.background2};
	}

	text-align: center;
	padding: 10px;
	border: 10px;
	cursor: pointer;
`;

export const StealthButton = styled(ButtonBase)`
	background-color: ${props => props.theme.colors.background};
	color: ${props => props.theme.colors.text};

	&:hover {
		background-color: ${props => props.theme.colors.text};
		color: ${props => props.theme.colors.background};
	}
`;

import styled from '@emotion/styled';

export const Container = styled.div<{vertStretch?: boolean}>`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: 10px;
	min-height: 100%;
	align-content: ${props => (props.vertStretch ? 'stretch' : 'baseline')};
`;

export const Bad = styled.span`
	color: ${props => props.theme.colors.error};
`;

export const Full = styled.div`
	display: grid;
	grid-column-end: span 12;
	justify-items: stretch;
	overflow: scroll;
`;

export const Half = styled.div`
	display: grid;
	grid-column-end: span 6;
	justify-items: stretch;
`;

export const Third = styled.div`
	display: grid;
	grid-column-end: span 4;
	justify-items: stretch;
`;

export const Quarter = styled.div`
	display: grid;
	grid-column-end: span 3;
	justify-content: stretch;
`;

export const BigLeft = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	justify-items: stretch;
`;
export const BigRight = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: stretch;
`;

export const Area = styled.textarea<{'min-height'?: string}>`
	resize: none;
	tab-size: 2;
	${props => (props['min-height'] ? `min-height: ${props['min-height']}` : '')}
`;

export const ButtonBase = styled.div`
	text-align: center;
	padding: 10px;
	border-radius: 5px;
	border: 10px;
	cursor: pointer;
`;

export const Button = styled.div<{selected?: boolean}>`
	background-color: ${props =>
		props.selected
			? props.theme.colors.featureBackground2
			: props.theme.colors.featureBackground};
	color: ${props =>
		props.selected
			? props.theme.colors.featureBackgroundContrast2
			: props.theme.colors.featureBackgroundContrast};

	&:hover {
		background-color: ${props => props.theme.colors.featureBackgroundContrast2};
		color: ${props => props.theme.colors.featureBackground2};
	}

	text-align: center;
	padding: 10px;
	border-radius: 5px;
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

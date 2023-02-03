import styled from '@emotion/styled';

export const ContainerBaseline = styled.div<{vertStretch?: boolean}>`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: 10px;
	min-height: 100%;
	max-height: 100%;
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

export const Area = styled.textarea`
	resize: none;
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
	border: 10px green;
	cursor: pointer;
`;

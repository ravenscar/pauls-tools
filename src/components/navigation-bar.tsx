import React from 'react';

import {NavLink} from 'react-router-dom';
import styled from '@emotion/styled';
import {authedLinks} from '../routes';
import {Button} from '../pages/style-helpers';

const Nav = styled.nav`
	display: flex;
	background-color: ${props => props.theme.colors.background2};
	padding: 10px;
	flex-direction: row;
	gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
	margin-top: auto;
	margin-bottom: auto;
	color: ${props => props.theme.colors.text2};
	text-align: center;
	text-decoration: none;
	padding-right: 10px;
	&:hover {
		color: ${props => props.theme.colors.link};
	}
	&.active {
		text-decoration: underline;
	}
`;

const LeftPadding = styled.div`
	margin-left: auto;
`;

const DarkModeToggle = styled(Button)`
	margin-left: 50px;
`;

type Props = {
	toggleDarkmode: () => void;
	id: string;
};

export const NavigationBar = (props: Props) => (
	<Nav id={props.id}>
		<LeftPadding />
		{authedLinks.map(({path, display}) => (
			<StyledNavLink to={path} key={path}>
				{display}
			</StyledNavLink>
		))}
		<DarkModeToggle onClick={props.toggleDarkmode}>🌞 / 🌙</DarkModeToggle>
	</Nav>
);

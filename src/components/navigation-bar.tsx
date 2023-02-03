import React from 'react';

import {NavLink} from 'react-router-dom';
import styled from '@emotion/styled';
import {authedLinks} from '../routes';
import {Button} from '../pages/style-helpers';

const Nav = styled.nav`
	display: grid;
	grid-area: header;
	grid-template-areas: 'nav spacing settings';
	background-color: ${props => props.theme.colors.featureBackground};
	padding-top: 10px;
	padding-bottom: 10px;
`;

const NavRow = styled.div`
	grid-area: nav;
	margin-top: auto;
	margin-bottom: auto;
	margin-bottom: auto;
	padding: 0;
`;

const StyledNavLink = styled(NavLink)`
	color: ${props => props.theme.colors.featureBackgroundContrast};
	text-align: center;
	text-decoration: none;
	padding: 10px;
	&:hover {
		text-decoration: underline;
	}
	&.active {
	}
`;

const DarkmodeToggle = styled(Button)`
	grid-area: settings;
	margin-left: auto;
	margin-right: 10px;
`;

type Props = {
	toggleDarkmode: () => void;
	id: string;
};

export const NavigationBar = (props: Props) => (
	<Nav id={props.id}>
		<NavRow>
			{authedLinks.map(({path, display}) => (
				<StyledNavLink to={path} key={path}>
					{display}
				</StyledNavLink>
			))}
		</NavRow>
		<DarkmodeToggle selected={true} onClick={props.toggleDarkmode}>
			🌞 / 🌙
		</DarkmodeToggle>
	</Nav>
);

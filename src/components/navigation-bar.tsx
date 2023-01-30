import React from 'react';

import {NavLink} from 'react-router-dom';
import styled from '@emotion/styled';
import {authedLinks} from '../routes';

const Nav = styled.nav`
	display: grid;
	grid-column: col-start / span 12;
	grid-row: 1;
	background-color: ${props => props.theme.colors.featureBackground};
	padding-top: 10px;
	padding-bottom: 10px;
`;

const NavRow = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0;
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
`;

const DarkmodeToggle = styled.button`
	grid-column: col-start 10 / span 2;
	grid-row: 1;
	color: ${props => props.theme.colors.featureBackgroundContrast2};
	background-color: ${props => props.theme.colors.featureBackground2};
	margin-left: auto;
	border-radius: 5px;
	margin-right: 10px;
	border: none;
	padding: 10px;
	font-weight: 700;
	&:hover {
		background-color: ${props => props.theme.colors.featureBackgroundContrast2};
		color: ${props => props.theme.colors.featureBackground2};
	}
`;

const activeStyle = {
	fontWeight: 700,
};

type Props = {
	toggleDarkmode: () => void;
};

export const NavigationBar = (props: Props) => (
	<>
		<Nav>
			<NavRow>
				{authedLinks.map(({path, display}) => (
					<StyledNavLink
						to={path}
						key={path}
						style={({isActive}) => (isActive ? activeStyle : undefined)}
					>
						{display}
					</StyledNavLink>
				))}
			</NavRow>
			<DarkmodeToggle onClick={props.toggleDarkmode}>🌞 / 🌙</DarkmodeToggle>
		</Nav>
	</>
);

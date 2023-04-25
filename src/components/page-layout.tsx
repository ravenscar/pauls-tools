import React, {type PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {NavigationBar} from './navigation-bar';

const Container = styled.div`
	min-height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	grid-template-areas:
		'header'
		'content'
		'footer';
`;

const Page = styled.div`
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 80px;
	padding-bottom: 50px;
	min-height: 100%;
`;

const Header = styled.div`
	position: fixed;
	top: 0;
	justify-self: center;
	min-width: 90%;
	z-index: 1;
`;

const Footer = styled.footer`
	align-content: end;
	position: fixed;
	bottom: 0;
	justify-self: center;
	min-width: 90%;
	z-index: 1;
	padding: 10px;
	background-color: ${props => props.theme.colors.featureBackground};
	color: ${props => props.theme.colors.featureBackgroundContrast};
	font-size: small;
	text-align: center;
	border-radius: 5px;
`;

type Props = PropsWithChildren & {
	toggleDarkmode: () => void;
};

export const PageLayout = (props: Props) => (
	<Container>
		<Header>
			<NavigationBar id='header' toggleDarkmode={props.toggleDarkmode} />
		</Header>
		<Page>{props.children}</Page>
		<Footer id='footer'>
			<center>
				Drink more beer.&nbsp;
				<a
					href='https://innerwestaletrail.com.au/'
					target='_blank'
					rel='noreferrer'
				>
					It&apos;s good for you! 🍻
				</a>
			</center>
		</Footer>
	</Container>
);

import React, {type PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {NavigationBar} from './navigation-bar';

const Container = styled.div`
	min-height: 100%;
	max-height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
	max-height: 100vh;
	grid-template-areas:
		'header'
		'content'
		'footer';
`;

const Page = styled.div`
	margin: 20px;
	min-height: 100%;
	max-height: 100%;
`;

const Footer = styled.footer`
	width: 100%;
	height: 30px;
	margin: 10px;
	background-color: ${props => props.theme.colors.featureBackground};
	color: ${props => props.theme.colors.featureBackgroundContrast};
	font-size: small;
	text-align: center;
`;

type Props = PropsWithChildren & {
	toggleDarkmode: () => void;
};

export const PageLayout = (props: Props) => (
	<Container>
		<NavigationBar id='header' toggleDarkmode={props.toggleDarkmode} />
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

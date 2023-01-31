import React, {type PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {NavigationBar} from './navigation-bar';

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 60px 1fr;
	min-height: 100vh;
`;

const Page = styled.div`
	display: inline-grid;
	grid-column: 1;
	grid-row: 2;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	margin: 20px;
	min-height: ${() => window.innerHeight - 150}px;
	max-height: ${() => window.innerHeight - 150}px;
`;

const Footer = styled.footer`
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 30px;
	padding: 10px;
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
		<NavigationBar toggleDarkmode={props.toggleDarkmode} />
		<Page>{props.children}</Page>
		<Footer>
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

import React, {type PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {NavigationBar} from './navigation-bar';

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(12, [col-start] 1fr);
	grid-template-areas:
		'header header  header'
		'content content content'
		'content content content'
		'footer footer footer';
	gap: 20px;
	margin-bottom: 50px;
`;

const Page = styled.div`
	grid-column: col-start / span 12;
	grid-row: 2;
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

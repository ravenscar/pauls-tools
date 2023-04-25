import React, {type PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {NavigationBar} from './navigation-bar';

const Container = styled.div`
	min-height: 100%;
	min-width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const Page = styled.div`
	margin-left: 10px;
	margin-right: 10px;
`;

const Header = styled.div`
	flex: 1;
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
	</Container>
);

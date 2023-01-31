import styled from '@emotion/styled';
import React from 'react';
import {PaulTable} from '../components/paul-table';

import logo from '../logo.svg';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Home = () => (
	<HomeContainer>
		<img src={logo} className='App-logo' alt='logo' />
		<p>
			Edit <code>src/App.tsx</code> and save to reload.
		</p>

		<PaulTable
			headers={['foo', 'bar', 'baz', 'qux']}
			data={[
				[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
			]}
		/>
		<a
			className='App-link'
			href='https://reactjs.org'
			target='_blank'
			rel='noopener noreferrer'
		>
			Learn React
		</a>
	</HomeContainer>
);

export default Home;

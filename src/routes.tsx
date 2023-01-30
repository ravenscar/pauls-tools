import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Placeholder} from './pages/page-placeholder';
import {Home} from './pages/page-home';

export type AppRoutes = Array<{
	path: string;
	display: string;
	element: JSX.Element;
	isNav: boolean;
	navValue: number; // Lesser values ordered left in navBar
}>;
export const routes: AppRoutes = [
	{
		path: '/staff',
		display: 'Staff',
		element: <Placeholder role='Staff' />,
		isNav: true,
		navValue: 10,
	},
	{
		path: '/product',
		display: 'Product',
		element: <Placeholder role='Product' />,
		isNav: true,
		navValue: 20,
	},
	{
		path: '/developer',
		display: 'Developer',
		element: <Placeholder role='Developer' />,
		isNav: true,
		navValue: 30,
	},
	{
		path: '/admin',
		display: 'Admin',
		element: <Placeholder role='Admin' />,
		isNav: true,
		navValue: 40,
	},
	{
		path: '/calls',
		display: 'Calls',
		element: <Placeholder role='Calls' />,
		isNav: false,
		navValue: 50,
	},
	{
		path: '/',
		display: 'Home',
		element: <Home />,
		isNav: true,
		navValue: 0,
	},
];

export const authedLinks = routes
	.filter(({isNav}) => isNav)
	.sort((a, b) => a.navValue - b.navValue)
	.map(({path, display}) => ({
		path,
		display,
	}));

export const RouterRoutes = () => (
	<Routes>
		{routes.map(({path, element}) => (
			<Route key={path} path={path} element={element} />
		))}
	</Routes>
);

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Placeholder from './pages/page-placeholder';
import Todos from './pages/page-todos';
import Cases from './pages/page-cases';
import Diff from './pages/page-diff';
import Utils from './pages/page-utils';
import Converters from './pages/page-converters';
import Snippets from './pages/page-snippets';

export type AppRoutes = Array<{
	path: string;
	display: string;
	element: JSX.Element;
	isNav: boolean;
	navValue: number; // Lesser values ordered left in navBar
}>;
export const routes: AppRoutes = [
	{
		path: '/snippets',
		display: 'Snippets',
		element: <Snippets />,
		isNav: true,
		navValue: 5,
	},
	{
		path: '/converters',
		display: 'Converters',
		element: <Converters />,
		isNav: true,
		navValue: 10,
	},
	{
		path: '/diff',
		display: 'Diff',
		element: <Diff />,
		isNav: true,
		navValue: 20,
	},
	{
		path: '/utils',
		display: 'Utils',
		element: <Utils />,
		isNav: true,
		navValue: 100,
	},
	{
		path: '/cases',
		display: 'Cases',
		element: <Cases />,
		isNav: true,
		navValue: 30,
	},
	{
		path: '/developer',
		display: 'Developer',
		element: <Placeholder role='Developer' />,
		isNav: false,
		navValue: 30,
	},
	{
		path: '/admin',
		display: 'Admin',
		element: <Placeholder role='Admin' />,
		isNav: false,
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
		display: 'Todo',
		element: <Todos />,
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

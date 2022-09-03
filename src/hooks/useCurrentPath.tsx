import { matchRoutes, RouteMatch, useLocation } from 'react-router-dom';

const routes = [
	{ path: '/people' },
	{ path: '/people/:id' },
	{ path: '/starships' },
	{ path: '/starships/:id' },
	{ path: '/vehicles' },
	{ path: '/vehicles/:id' },
	{ path: '/species' },
	{ path: '/species/:id' },
	{ path: '/planets' },
	{ path: '/planets/:id' },
	{ path: '/films' },
	{ path: '/films/:id' },
];

export const useCurrentPath = () => {
	const location = useLocation();
	const [{ route }] = matchRoutes(routes, location) as RouteMatch<string>[];

	return route.path;
};

import { Link, Outlet } from 'react-router-dom';
import './index.css';

interface tabNavProps {
	handleChangeTab: (tab: string) => void;
}

export const TabNav = ({ handleChangeTab }: tabNavProps) => {
	return (
		<>
			<nav
				onClick={(e) => {
					const uri = e.currentTarget.baseURI.split('/');
					const path = uri[uri.length - 1];
					handleChangeTab(path);
				}}
			>
				<Link to="/people">Personagens</Link>
				<Link to="/starships">Naves</Link>
				<Link to="/vehicles">Veículos</Link>
				<Link to="/planets">Planetas</Link>
				<Link to="/species">Espécies</Link>
				<Link to="/films">Filmes</Link>
			</nav>
			<Outlet />
		</>
	);
};

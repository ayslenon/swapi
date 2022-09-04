import { Link, Outlet } from 'react-router-dom';
import './index.css';

export const TabNav = () => {
	return (
		<>
			<nav>
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

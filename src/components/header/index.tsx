import './index.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
	const { authState, logout } = useAuth();

	function handleLogout(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.preventDefault();
		logout();
	}

	return (
		<div className="header">
			<div>
				<h1>SWAPI</h1>
			</div>
			{authState.loggedUser.username != '' ? (
				<div onClick={handleLogout}>
					<h3>Logout</h3>
				</div>
			) : (
				<div className="login">
					<h4>
						<Link to={'/cadastro'}>CADASTRE-SE</Link>
					</h4>
					<h4>
						<Link to={'/login'}>ENTRAR</Link>
					</h4>
				</div>
			)}
		</div>
	);
};

import './index.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

export const Header = () => {
	const { authState, logout } = useAuth();
	const [chooseHeader, setChooseHeader] = useState(false);

	useEffect(() => {
		if (authState.loggedUser.username.length > 0) setChooseHeader(true);
		else setChooseHeader(false);
	}, [authState]);

	return (
		<div className="header">
			<Link to="/">
				<h1>SWAPI</h1>
			</Link>
			{chooseHeader ? (
				<div onClick={logout}>
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

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cadastro } from './pages/cadastro';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Recuperar } from './pages/recuperar';
import { useAuth } from './hooks/useAuth';

function RoutingComponent() {
	const { authState } = useAuth();
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />;
				<Route
					path="/cadastro"
					element={
						authState.loggedUser.username != '' ? (
							<Navigate to="/" />
						) : (
							<Cadastro />
						)
					}
				/>
				;
				<Route
					path="/login"
					element={
						authState.loggedUser.username != '' ? (
							<Navigate to="/" />
						) : (
							<Login />
						)
					}
				/>
				;
				<Route
					path="/recuperar"
					element={
						authState.loggedUser.username != '' ? (
							<Navigate to="/" />
						) : (
							<Recuperar />
						)
					}
				/>
				;
				<Route
					path="*"
					element={
						<main style={{ padding: '1rem' }}>
							<p>Página não encontrada</p>
						</main>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default RoutingComponent;

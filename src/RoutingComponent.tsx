import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cadastro } from './pages/cadastro';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Recuperar } from './pages/recuperar';
import { AuthProvider } from './contexts/authProvider';
import { useAuth } from './hooks/useAuth';

function RoutingComponent() {
	const { authState } = useAuth();
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />;
					<Route
						path="/cadastro"
						element={
							authState.loggedUser.username.length > 0 ? (
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
							authState.loggedUser.username.length > 0 ? (
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
							authState.loggedUser.username.length > 0 ? (
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
		</AuthProvider>
	);
}

export default RoutingComponent;

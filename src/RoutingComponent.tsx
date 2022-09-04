import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Cadastro } from './pages/cadastro';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Recuperar } from './pages/recuperar';
import { useAuth } from './hooks/useAuth';
import { Films } from './pages/landing/Films';
import { People } from './pages/landing/People';
import { Starships } from './pages/landing/Starships';
import { Vehicles } from './pages/landing/Vehicles';
import { Planets } from './pages/landing/Planets';
import { Species } from './pages/landing/Species';

function RoutingComponent() {
	const { authState } = useAuth();
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />}>
					<Route path="people" element={<People />} />
					<Route path="starships" element={<Starships />} />
					<Route path="vehicles" element={<Vehicles />} />
					<Route path="planets" element={<Planets />} />
					<Route path="species" element={<Species />} />
					<Route path="films" element={<Films />} />
				</Route>
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

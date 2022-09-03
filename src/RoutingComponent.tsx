import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cadastro } from './pages/cadastro';

import { Landing } from './pages/landing';
import { Login } from './pages/login';
import { Recuperar } from './pages/recuperar';

function RoutingComponent() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />;
				<Route path="/cadastro" element={<Cadastro />} />;
				<Route path="/login" element={<Login />} />;
				<Route path="/recuperar" element={<Recuperar />} />;
			</Routes>
		</BrowserRouter>
	);
}

export default RoutingComponent;

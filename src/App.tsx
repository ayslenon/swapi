import { AuthProvider } from './contexts/authProvider';
import RoutingComponent from './RoutingComponent';

function App() {
	return (
		<AuthProvider>
			<RoutingComponent />;
		</AuthProvider>
	);
}

export default App;

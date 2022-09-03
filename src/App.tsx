import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/authProvider';
import RoutingComponent from './RoutingComponent';

function App() {
	return (
		<AuthProvider>
			<ToastContainer />
			<RoutingComponent />
		</AuthProvider>
	);
}

export default App;

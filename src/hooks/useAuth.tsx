import { useContext } from 'react';
import { authContext } from '../contexts/authProvider';

export const useAuth = () => {
	return useContext(authContext);
};

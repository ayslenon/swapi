import { createContext, useEffect, useState } from 'react';
import { authedUsers } from './authedUsers';
import { toast } from 'react-toastify';
export interface userCadastroType {
	email: string;
	password: string;
	username?: string;
}

export interface userLoginType {
	email: string;
	Authorization: string;
}

export interface userType {
	login: userLoginType;
	username: string;
}
export interface authStateType {
	authedUsers: userType[];
	loggedUser: userType;
}
interface authProviderProps {
	children: React.ReactNode;
}

export interface authContextType {
	authState: authStateType;
	cadastrar: (user: userCadastroType) => void;
	login: (user: userLoginType) => void;
	redefinirLogin: (user: userCadastroType) => void;
	logout: () => void;
}

const initialState: authStateType = {
	loggedUser: {
		login: { email: '', Authorization: '' },
		username: '',
	},
	authedUsers,
};

export const authContext = createContext<authContextType>({
	authState: initialState,
	cadastrar: () => {
		//
	},
	login: () => {
		//
	},
	redefinirLogin: () => {
		//
	},
	logout: () => {
		//
	},
});

export const AuthProvider = ({ children }: authProviderProps) => {
	const [authState, setAuthState] = useState(initialState);
	useEffect(() => {
		const user = JSON.parse(
			sessionStorage.getItem('@SWAPI_user') as string,
		) as userType;
		if (user?.username?.length > 0) {
			const newState = {
				authedUsers,
				loggedUser: user,
			} as authStateType;
			setAuthState(newState);
		}
	}, []);

	function cadastrar(newUser: userCadastroType) {
		const user = authState.authedUsers.find(
			(authedUser) => authedUser.login.email == newUser.email,
		);
		if (user !== undefined) {
			toast.error('Usuário já cadastrado');
			console.log('[AUTH CONTEXT] [cadastrar] -> usuário já cadastrado');
		} else {
			const authedUsers = authState.authedUsers;
			const token = `Bearer ${btoa(newUser.email)} ${btoa(newUser.password)}`;
			const newAuthedUser = {
				login: { email: newUser.email, Authorization: token },
				username: newUser.username,
			} as userType;
			authedUsers.push(newAuthedUser);
			const newState = { authedUsers, loggedUser: authState.loggedUser };
			setAuthState(newState);
			toast.success('Usuário cadastrado com sucesso');
			console.log(
				'[AUTH CONTEXT] [cadastrar] -> usuário cadastrado com sucesso',
			);
		}
	}

	function login(u: userLoginType) {
		const user = authState.authedUsers.find((authedUser) => {
			return (
				authedUser.login.email == u.email &&
				authedUser.login.Authorization == u.Authorization
			);
		});
		if (user !== undefined) {
			const authedUsers = authState.authedUsers;
			const loggedUser = user;
			const newState = {
				authedUsers,
				loggedUser,
			} as authStateType;
			setAuthState(newState);
			sessionStorage.setItem('@SWAPI_user', JSON.stringify(user));
			toast.success('Login realziado com sucesso');
			console.log('[AUTH CONTEXT] [login] -> usuário logado com sucesso');
		} else {
			toast.error('Usuário não cadastrado ou senha incorreta');
			console.log('[AUTH CONTEXT] [login] -> usuário não cadastrado');
		}
	}

	function logout() {
		const noUser = {
			login: { email: '', Authorization: '' },
			username: '',
		};
		const newState = {
			loggedUser: noUser,
			authedUsers: [...authState.authedUsers],
		};
		setAuthState(newState);
		sessionStorage.removeItem('@SWAPI_user');
		toast.success('Logout realizado com sucesso');
		console.log('[AUTH CONTEXT] [logout] -> usuário deslogado com sucesso');
	}

	function redefinirLogin(user: userCadastroType) {
		const userExists = authState.authedUsers.find(
			(authedUser) => authedUser.login.email == user.email,
		);
		if (userExists === undefined) {
			toast.error('Usuário não encontrado');
			console.log('[AUTH CONTEXT] [redefinirLogin] -> usuário não cadastrado');
		} else {
			const index = authState.authedUsers.indexOf(userExists);
			const authedUsers = authState.authedUsers;
			const Authorization = `Bearer ${btoa(user.email)} ${btoa(user.password)}`;
			const username = authState.authedUsers[index].username;
			const newUserInfo = {
				login: { email: user.email, Authorization },
				username,
			} as userType;

			authedUsers[index] = newUserInfo;
			const newState = {
				authedUsers,
				loggedUser: authState.loggedUser,
			} as authStateType;
			setAuthState(newState);
			sessionStorage.setItem('@SWAPI_user', JSON.stringify(newUserInfo));
			toast.success('Senha alterada com sucesso');
			console.log(
				'[AUTH CONTEXT] [redefinirLogin] -> usuário atualizado com sucesso',
			);
		}
	}

	return (
		<authContext.Provider
			value={{ authState, cadastrar, login, logout, redefinirLogin }}
		>
			{children}
		</authContext.Provider>
	);
};

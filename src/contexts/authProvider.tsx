import { createContext, useState } from 'react';
import { users } from './authedUsers';

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
	authedUsers: users,
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

export const authProvider = ({ children }: authProviderProps) => {
	const [authState, setAuthState] = useState(initialState);
	function cadastrar(newUser: userCadastroType) {
		authState.authedUsers.forEach((user) => {
			if (user.login.email == newUser.email) {
				return console.log(
					'[AUTH CONTEXT] [cadastrar] -> usuário já cadastrado',
				);
			}
		});
		const temp = authState;
		const token = `Bearer ${btoa(newUser.email)} ${btoa(newUser.password)}`;
		const temp2 = {
			login: { email: newUser.email, Authorization: token },
			username: newUser.username,
		} as userType;
		temp.authedUsers.push(temp2);
		setAuthState(temp);
		console.log('[AUTH CONTEXT] [cadastrar] -> usuário cadastrado com sucesso');
	}

	function login(u: userLoginType) {
		console.log('aaaaa');
		authState.authedUsers.forEach((user) => {
			if (user.login === u) {
				const temp = authState;
				temp.loggedUser = user;
				setAuthState(temp);
				console.log('[AUTH CONTEXT] [login] -> usuário logado com sucesso');
			} else console.log('[AUTH CONTEXT] [login] -> usuário não cadastrado');
		});
	}

	function logout() {
		const temp = authState;
		temp.loggedUser = { login: { email: '', Authorization: '' }, username: '' };
		setAuthState(temp);
		console.log('[AUTH CONTEXT] [logout] -> usuário deslogado com sucesso');
	}

	function redefinirLogin(newUser: userCadastroType) {
		authState.authedUsers.forEach((user, index) => {
			if (user.login.email === newUser.email) {
				const temp = authState;
				const token = `Bearer ${btoa(newUser.email)} ${btoa(newUser.password)}`;
				const temp2 = {
					login: { email: newUser.email, Authorization: token },
					username: newUser.username,
				} as userType;
				temp.authedUsers[index] = temp2;
				setAuthState(temp);
				console.log(
					'[AUTH CONTEXT] [login] -> cadastro atualizado com sucesso',
				);
			} else console.log('[AUTH CONTEXT] [login] -> usuário não cadastrado');
		});
	}
	return (
		<authContext.Provider
			value={{ authState, cadastrar, login, logout, redefinirLogin }}
		>
			{children}
		</authContext.Provider>
	);
};

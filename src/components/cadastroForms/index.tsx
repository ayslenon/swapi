import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface userInfoType {
	email: string;
	password: string;
}
export interface cadastroFormsType {
	handleSubmit: (args: userInfoType) => void;
	cadastro: boolean;
}

export const CadastroForms = (props: cadastroFormsType) => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordC, setPasswordC] = useState('');

	function handleEnvio(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (
			username.length != 0 &&
			email.includes('@email.com') &&
			password.length === 8
		) {
			const userInfo = { email, password, username } as userInfoType;
			props.handleSubmit(userInfo);
			console.log(
				'[COMPONENTS] [CadastroForms] [handleEnvio] -> Enviado com sucesso',
			);
		} else {
			console.log(
				'[COMPONENTS] [CadastroForms] [handleEnvio] -> Alguma info faltando',
			);
		}
	}

	return (
		<div>
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': {
						m: 1,
						width: '25ch',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						margin: 'auto',
						padding: '0 0 15px 0 ',
					},
					'& .MuiButton-root': {
						m: 1,
						width: '25ch',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						margin: 'auto',
						padding: 'auto',
					},
				}}
				noValidate
				autoComplete="off"
			>
				{props.cadastro && (
					<TextField
						error={username.length === 0}
						id="nome"
						label="Nome"
						value={username}
						onChange={(v) => setUsername(v.target.value)}
						placeholder="Insira seu nome"
						helperText={username.length === 0 ? 'Insira o seu nome' : ''}
					/>
				)}
				<TextField
					error={!email.includes('@email.com') && email.length != 0}
					id="email"
					label="Email"
					value={email}
					onChange={(v) => setEmail(v.target.value)}
					placeholder="Insira seu email"
					helperText={
						!email.includes('@email.com') && email.length != 0
							? 'Insira o email corretamente'
							: ''
					}
				/>
				<TextField
					error={password.length != 0 && password.length != 8}
					id="senha"
					label="Senha"
					value={password}
					onChange={(v) => setPassword(v.target.value)}
					placeholder="Insira sua senha"
					helperText={
						password.length != 0 && password.length != 8
							? 'A senha deve ter 8 caraceteres'
							: ''
					}
				/>
				<TextField
					error={password != passwordC}
					id="senha-confirmar"
					label="Confirme a senha"
					value={passwordC}
					onChange={(v) => setPasswordC(v.target.value)}
					placeholder="Insira sua senha novamente"
					helperText={password != passwordC ? 'As senhas não correspondem' : ''}
				/>
				<Button variant="text">
					<Link to="/login">Fazer Login</Link>
				</Button>
				<Button variant="outlined" onClick={handleEnvio}>
					{props.cadastro ? 'Finalizar cadastro!' : 'Recuperar senha!'}
				</Button>
			</Box>
		</div>
	);
};

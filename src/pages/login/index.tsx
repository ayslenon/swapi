import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header';
import { userLoginType } from '../../contexts/authProvider';
import { useAuth } from '../../hooks/useAuth';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuth();

	function handleLogar() {
		if (email.includes('@email.com') && password.length === 8) {
			const Authorization = `Bearer ${btoa(email)} ${btoa(password)}`;
			const userInfo = { email, Authorization } as userLoginType;
			login(userInfo);
			console.log('[PAGES] [Login] [handleLogar] -> Enviado com sucesso');
		} else {
			console.log('[PAGES] [Login] [handleLogar] -> Alguma info está errada');
		}
	}
	return (
		<div>
			<Header />
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
				<TextField
					error={!email.includes('@email.com')}
					id="email"
					label="Email"
					value={email}
					onChange={(v) => setEmail(v.target.value)}
					placeholder="Insira seu email"
				/>
				<TextField
					error={password.length === 0}
					id="senha"
					label="Senha"
					value={password}
					onChange={(v) => setPassword(v.target.value)}
					placeholder="Insira sua senha"
				/>
				<Button variant="text">
					<Link to="/recuperar">Recuperar senha</Link>
				</Button>
				<Button variant="outlined" onClick={handleLogar}>
					Fazer Login
				</Button>
			</Box>
		</div>
	);
};

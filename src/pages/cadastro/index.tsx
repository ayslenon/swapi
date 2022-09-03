import { CadastroForms } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { userCadastroType } from '../../contexts/authProvider';

export const Cadastro = () => {
	const { cadastrar } = useAuth();
	const navigate = useNavigate();
	function realizarCadastro(args: userCadastroType) {
		cadastrar(args);
		navigate('/');
	}

	return (
		<div>
			<Header />
			<CadastroForms cadastro={true} handleSubmit={realizarCadastro} />
		</div>
	);
};

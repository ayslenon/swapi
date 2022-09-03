import { CadastroForms } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { userCadastroType } from '../../contexts/authProvider';

export const Recuperar = () => {
	const { redefinirLogin } = useAuth();
	const navigate = useNavigate();
	function realizarRedefinicao(args: userCadastroType) {
		redefinirLogin(args);
		navigate('/');
	}

	return (
		<div>
			<Header />
			<CadastroForms cadastro={false} handleSubmit={realizarRedefinicao} />
		</div>
	);
};

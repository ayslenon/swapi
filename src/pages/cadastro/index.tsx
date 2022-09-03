import { CadastroForms } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';

export const Cadastro = () => {
	const { cadastrar } = useAuth();

	return (
		<div>
			<Header />
			<CadastroForms cadastro={true} handleSubmit={cadastrar} />
		</div>
	);
};

import { CadastroForms } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';

export const Recuperar = () => {
	const { redefinirLogin } = useAuth();

	return (
		<div>
			<Header />
			<CadastroForms cadastro={false} handleSubmit={redefinirLogin} />
		</div>
	);
};

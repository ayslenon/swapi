import { CadastroForms, userInfoType } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';

export const Cadastro = () => {
	const { authState, cadastrar } = useAuth();
	function handleFinalizarCadastro(userInfo: userInfoType) {
		cadastrar(userInfo);
	}
	return (
		<div>
			<Header />
			<CadastroForms cadastro={true} handleSubmit={handleFinalizarCadastro} />
		</div>
	);
};

import { CadastroForms, userInfoType } from '../../components/cadastroForms';
import { Header } from '../../components/header';
import { useAuth } from '../../hooks/useAuth';

export const Recuperar = () => {
	const { authState, redefinirLogin } = useAuth();
	function handleRecuperarSenha(userInfo: userInfoType) {
		//console.log(userInfo);
		redefinirLogin(userInfo);
	}
	return (
		<div>
			<Header />
			<CadastroForms cadastro={false} handleSubmit={handleRecuperarSenha} />
		</div>
	);
};

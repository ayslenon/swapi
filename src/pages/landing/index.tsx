import { Filtro } from '../../components/filtro';
import { Header } from '../../components/header';
import { TabNav } from '../../components/tabNav/TabNav';

export const Landing = () => {
	return (
		<div>
			<Header />
			<Filtro />
			<TabNav />
		</div>
	);
};

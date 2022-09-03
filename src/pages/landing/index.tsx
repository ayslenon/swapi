import { useState } from 'react';
import { Filtro } from '../../components/filtro';
import { Header } from '../../components/header';
import { TabNav } from '../../components/tabNav/TabNav';

export const Landing = () => {
	const [tab, setTab] = useState('people');
	return (
		<div>
			<Header />
			<Filtro />
			<TabNav handleChangeTab={setTab} />
		</div>
	);
};

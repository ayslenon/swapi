import { useState } from 'react';
import './index.css';

export const Filtro = () => {
	const [search, setSearch] = useState('');

	function procurarNaAPI(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
	}

	return (
		<div className="filter-wrapper">
			<input
				type="text"
				value={search}
				className="search-field"
				placeholder="Pesquisar na API"
				onChange={(e) => setSearch(e.target.value)}
			></input>
			<button type="submit" className="button-filter" onClick={procurarNaAPI}>
				Procurar
			</button>
		</div>
	);
};

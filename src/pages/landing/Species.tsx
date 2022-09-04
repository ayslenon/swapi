import { useEffect, useState } from 'react';
import { speciesSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

interface response {
	results: speciesSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Species = () => {
	const [species, setSpecies] = useState({} as response);
	const { authState } = useAuth();
	useEffect(() => {
		if (JSON.stringify(species) === '{}')
			swapi.get('species').then((res) => {
				setSpecies(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (species.count % 10 != 0) {
			return Math.floor(species.count / 10) + 1;
		}
		return species.count ? Math.floor(species.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		swapi.get(`species/?page=${page}`).then((res) => {
			setSpecies(res.data as response);
		});
	}

	function handleClick(e: React.ChangeEvent<unknown>, result: speciesSchema) {
		if (authState.loggedUser.username != '') {
		} else toast.error('Por favor, faça login antes de ver os detalhes');
	}

	return (
		<>
			<Pagination
				count={calculaPaginas()}
				shape="rounded"
				showFirstButton
				showLastButton
				onChange={handlePagination}
			/>

			<div className="wrapper">
				{species.results?.map((result, index) => {
					return (
						<div
							key={index}
							className="item"
							onClick={(e) => handleClick(e, result)}
						>
							<h3>Nome: {result.name}</h3>
							<h3>Expectativa de vida: {result.average_lifespan}</h3>
							<h3>Altura média (cm): {result.average_height}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

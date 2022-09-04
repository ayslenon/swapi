import { useEffect, useState } from 'react';
import { starshipsSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';

interface response {
	results: starshipsSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Starships = () => {
	const [starships, setStarships] = useState({} as response);
	useEffect(() => {
		if (JSON.stringify(starships) === '{}')
			swapi.get('starships').then((res) => {
				setStarships(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (starships.count % 10 != 0) {
			return Math.floor(starships.count / 10) + 1;
		}
		return starships.count ? Math.floor(starships.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		swapi.get(`starships/?page=${page}`).then((res) => {
			setStarships(res.data as response);
		});
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
				{starships.results?.map((result, index) => {
					return (
						<div key={index} className="item">
							<h3>Nome: {result.name}</h3>
							<h3>Modelo: {result.model}</h3>
							<h3>Classe: {result.starship_class}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

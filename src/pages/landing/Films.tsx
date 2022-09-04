import { useEffect, useState } from 'react';
import { filmsSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';

interface response {
	results: filmsSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Films = () => {
	const [films, setFilms] = useState({} as response);
	useEffect(() => {
		if (JSON.stringify(films) === '{}')
			swapi.get('films').then((res) => {
				setFilms(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (films.count % 10 != 0) {
			return Math.floor(films.count / 10) + 1;
		}
		return films.count ? Math.floor(films.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		console.log(page);
		swapi.get(`films/?page=${page}`).then((res) => {
			console.log(res.data);
			setFilms(res.data as response);
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
				{films.results?.map((result, index) => {
					return (
						<div key={index} className="item">
							<h3>Nome: {result.title}</h3>
							<h3>Episódio: {result.episode_id}</h3>
							<h3>Ano de lançamento: {result.release_date}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

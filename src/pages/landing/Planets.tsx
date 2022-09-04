import { useEffect, useState } from 'react';
import { planetsSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';

interface response {
	results: planetsSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Planets = () => {
	const [planets, setPlanets] = useState({} as response);
	useEffect(() => {
		if (JSON.stringify(planets) === '{}')
			swapi.get('planets').then((res) => {
				setPlanets(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (planets.count % 10 != 0) {
			return Math.floor(planets.count / 10) + 1;
		}
		return planets.count ? Math.floor(planets.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		swapi.get(`planets/?page=${page}`).then((res) => {
			setPlanets(res.data as response);
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
				{planets.results?.map((result, index) => {
					return (
						<div key={index} className="item">
							<h3>Nome: {result.name}</h3>
							<h3>Gravidade: {result.gravity}</h3>
							<h3>Terreno: {result.terrain}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

import { useEffect, useState } from 'react';
import { peopleSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';

interface response {
	results: peopleSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const People = () => {
	const [people, setPeople] = useState({} as response);
	useEffect(() => {
		if (JSON.stringify(people) === '{}')
			swapi.get('people').then((res) => {
				setPeople(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (people.count % 10 != 0) {
			return Math.floor(people.count / 10) + 1;
		}
		return people.count ? Math.floor(people.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		swapi.get(`people/?page=${page}`).then((res) => {
			setPeople(res.data as response);
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
				{people.results?.map((result, index) => {
					return (
						<div key={index} className="item">
							<h3>Nome: {result.name}</h3>
							<h3>Ano de nascimento: {result.birth_year}</h3>
							<h3>Genero: {result.gender}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

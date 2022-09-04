import { useEffect, useState } from 'react';
import { peopleSchema } from '../../../utils/apiSchemas';
import { swapi } from '../../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';
import { resourceLimits } from 'worker_threads';
interface peopleResponse {
	results: peopleSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const People = () => {
	const [people, setPeople] = useState({} as peopleResponse);
	useEffect(() => {
		if (JSON.stringify(people) === '{}')
			swapi.get('people').then((res) => {
				setPeople(res.data as peopleResponse);
			});
	}, []);

	function calculaPaginas() {
		if (people.count % 10 != 0) {
			return Number((people.count / 10 + 1).toFixed(0));
		}
		return people.count ? Number((people.count / 10).toFixed(0)) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		console.log(page);
		swapi.get(`people/?page=${page}`).then((res) => {
			console.log(res.data);
			setPeople(res.data as peopleResponse);
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
						<div key={index} className="people">
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

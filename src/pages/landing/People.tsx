import { useEffect, useState } from 'react';
import { peopleSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';
interface response {
	results: peopleSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const People = () => {
	const [people, setPeople] = useState({} as response);
	const { authState } = useAuth();
	const navigate = useNavigate();
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

	function handleClick(e: React.ChangeEvent<unknown>, people: peopleSchema) {
		if (authState.loggedUser.username != '') {
			const id = people.url.split('/');
			navigate(`/people/${id[id.length - 2]}`);
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
				{people.results?.map((result, index) => {
					return (
						<div
							key={index}
							className="item"
							onClick={(e) => handleClick(e, result)}
						>
							<h3>Nome: {result.name}</h3>
							<h3>Ano de nascimento: {result.birth_year}</h3>
							<h3>Genero: {result.gender}</h3>
						</div>
					);
				})}
			</div>
			<Outlet />
		</>
	);
};

import { useEffect, useState } from 'react';
import { starshipsSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';

interface response {
	results: starshipsSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Starships = () => {
	const [starships, setStarships] = useState({} as response);
	const { authState } = useAuth();
	const navigate = useNavigate();
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

	function handleClick(
		e: React.ChangeEvent<unknown>,
		starship: starshipsSchema,
	) {
		if (authState.loggedUser.username != '') {
			const id = starship.url.split('/');
			navigate(`/starships/${id[id.length - 2]}`);
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
				{starships.results?.map((result, index) => {
					return (
						<div
							key={index}
							className="item"
							onClick={(e) => handleClick(e, result)}
						>
							<h3>Nome: {result.name}</h3>
							<h3>Modelo: {result.model}</h3>
							<h3>Classe: {result.starship_class}</h3>
						</div>
					);
				})}
			</div>
			<Outlet />
		</>
	);
};

import { useEffect, useState } from 'react';
import { vehiclesSchema } from '../../utils/apiSchemas';
import { swapi } from '../../config/api';
import './index.css';
import Pagination from '@mui/material/Pagination';

interface response {
	results: vehiclesSchema[];
	previous: string | null;
	next: string | null;
	count: number;
}

export const Vehicles = () => {
	const [vehicles, setVehicles] = useState({} as response);
	useEffect(() => {
		if (JSON.stringify(vehicles) === '{}')
			swapi.get('vehicles').then((res) => {
				setVehicles(res.data as response);
			});
	}, []);

	function calculaPaginas() {
		if (vehicles.count % 10 != 0) {
			return Math.floor(vehicles.count / 10) + 1;
		}
		return vehicles.count ? Math.floor(vehicles.count / 10) : 0;
	}

	function handlePagination(e: React.ChangeEvent<unknown>, page: number) {
		swapi.get(`vehicles/?page=${page}`).then((res) => {
			setVehicles(res.data as response);
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
				{vehicles.results?.map((result, index) => {
					return (
						<div key={index} className="item">
							<h3>Nome: {result.name}</h3>
							<h3>Modelo: {result.model}</h3>
							<h3>Preço em créditos: {result.cost_in_credits}</h3>
						</div>
					);
				})}
			</div>
		</>
	);
};

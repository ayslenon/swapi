import { useEffect, useState } from 'react';
import { swapi } from '../../config/api';
import { starshipsSchema } from '../../utils/apiSchemas';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

export const StarshipModal = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [starship, setStarship] = useState({} as starshipsSchema);
	useEffect(() => {
		swapi.get(`/starships/${params.id}`).then((res) => {
			setStarship(res.data as starshipsSchema);
		});
	}, []);

	function handleFechar() {
		navigate('/starships');
	}

	return (
		<div className="modal" onClick={handleFechar}>
			<h4>Nome da nave: {starship.name}</h4>
			<h4>Modelo da nave: {starship.model}</h4>
			<h4>Tamanho da nave (m): {starship.length}</h4>
			<h4>Fabricante da nave: {starship.manufacturer}</h4>
			<h4>Classe da nave: {starship.starship_class}</h4>
			<h4>Capacidade de carga (kg): {starship.cargo_capacity}</h4>
			<h4>Preço (moeda da galaxia): {starship.cost_in_credits}</h4>
			<h4>Tripulação necessária: {starship.crew}</h4>
			<h4>Quantidade de passageiros: {starship.passengers}</h4>
			<h4>Max velocidade na atmosfera: {starship.max_atmosphering_speed}</h4>
			<br />
			<h5>Clique novamente no modal para fechar</h5>
		</div>
	);
};

import { useEffect, useState } from 'react';
import { swapi } from '../../config/api';
import { peopleSchema } from '../../utils/apiSchemas';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

export const PeopleModal = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [people, setPeople] = useState({} as peopleSchema);
	useEffect(() => {
		swapi.get(`/people/${params.id}`).then((res) => {
			setPeople(res.data as peopleSchema);
		});
	}, []);

	function handleFechar() {
		navigate('/people');
	}

	return (
		<div className="modal" onClick={handleFechar}>
			<h4>Nome da nave: {people.name}</h4>
			<h4>Ano de nascimento: {people.birth_year}</h4>
			<h4>Cor dos olhos: {people.eye_color}</h4>
			<h4>Gênero: {people.gender}</h4>
			<h4>Cor do cabelo: {people.hair_color}</h4>
			<h4>Altura (cm): {people.height}</h4>
			<h4>Massa (kg): {people.mass}</h4>
			<h4>Cor da pele: {people.skin_color}</h4>
			<br />
			<h5>Clique novamente no modal para fechar</h5>
		</div>
	);
};

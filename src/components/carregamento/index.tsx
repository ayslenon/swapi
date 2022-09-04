import './style.css';

export const Carregamento = () => {
	return (
		<div className={'container'}>
			<svg className={'loading'}>
				<circle className={'circle'} cx="30" cy="30" r="25" />
			</svg>
		</div>
	);
};

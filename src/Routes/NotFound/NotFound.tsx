import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate(-1);
		}, 1000);
	}, [navigate]);

	return <div> Not Found</div>;
};

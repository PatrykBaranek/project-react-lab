import { FC } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import './Loading.css';

const Loading: FC = () => {
	return (
		<div className="loader">
			<RotatingLines
				strokeColor="grey"
				strokeWidth="5"
				animationDuration="0.75"
				width="96"
				visible={true}
			/>
		</div>
	);
};

export default Loading;

import { FC } from 'react';

export interface IErrorPageProps {
	errorMessage?: string;
}

const ErrorPage: FC<IErrorPageProps> = ({ errorMessage }) => {
	return (
		<div className="error-container">
			<p className="error-message">{errorMessage}</p>
		</div>
	);
};

export default ErrorPage;

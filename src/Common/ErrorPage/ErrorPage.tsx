import { FC } from 'react';

export interface IErrorPageProps {
	errorMessage?: string;
}

const ErrorPage: FC<IErrorPageProps> = ({ errorMessage }) => {
	return <p>{errorMessage}</p>;
};

export default ErrorPage;

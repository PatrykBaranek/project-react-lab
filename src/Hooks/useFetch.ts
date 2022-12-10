import { useState, useCallback, useEffect } from 'react';
import { MethodType } from '../Common/types';

const useFetch = <T>(url: string, method: MethodType) => {
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<T[]>([]);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(url, { method: method });

			if (response.ok) {
				const dataAPI = await response.json();

				setData(dataAPI);
			}

			setIsLoading(false);
		} catch (err) {
			if (err instanceof Error) {
				setIsLoading(false);
				setError(err.message);
			}
		}
	}, [url, method]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, error, isLoading };
};

export default useFetch;

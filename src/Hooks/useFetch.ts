import { useState, useEffect } from 'react';

const useFetch = <T>(url: string) => {
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [data, setData] = useState<T>();

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(url, {
					signal: controller.signal,
				});

				if (response.ok && response.status !== 403) {
					const dataAPI = await response.json();

					setData(dataAPI);
				}

				setIsLoading(false);
			} catch (err) {
				if (err instanceof Error) {
					if (err.name === 'AbortError') return;
					setIsLoading(false);
					setError(err.message);
				}
			}
		};

		fetchData();

		return () => controller.abort();
	}, [url]);

	return { data, error, isLoading };
};

export default useFetch;

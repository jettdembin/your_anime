import { useState, useEffect } from "react";
import axios from "axios";

const useAnilistAPI = (query: string) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.post(
					"https://graphql.anilist.co",
					{ query },
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				setData(response.data.data);
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchData();
	}, [query]);

	return { loading, error, data };
};

export default useAnilistAPI;

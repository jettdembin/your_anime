import axios from "axios";

export const fetchData = async (query: string) => {
	try {
		const response = await axios.post(
			"https://graphql.anilist.co",
			{ query },
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return response.data.data;
	} catch (error) {
		throw error;
	}
};

import axios from "axios";

export async function fetchData(query: string) {
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

		return response.data.data;
	} catch (error) {
		throw error;
	}
}

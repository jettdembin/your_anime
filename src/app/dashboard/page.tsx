const getAccountData = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/getAccountData`);

	if (!res.ok) {
		console.log(res);
	}
	return res.json();
};
const getPosts = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/getPosts`);

	if (!res.ok) {
		console.log(res);
	}
	return res.json();
};

export default async function Dashboard() {
	const data = await getAccountData();
	const posts = await getPosts();
	console.log(data, "DATATTATA");
	console.log(posts, "posts");
	return (
		<div>
			{data.map((user) => (
				<h1>{user.name}</h1>
			))}
		</div>
	);
}

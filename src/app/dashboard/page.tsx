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
const getHello = async () => {
	const res = await fetch(`${process.env.BASE_URL}/api/hello`);

	if (!res.ok) {
		console.log(res);
	}
	return res.json();
};

export default async function Dashboard() {
	const data = await getAccountData();
	const posts = await getPosts();
	const hello = await getHello();
	console.log(data, "DATATTATA");
	console.log(posts, "posts");
	console.log(hello, "hello");
	return (
		<div>
			{posts.map((post) => (
				<h1>{post.id}</h1>
			))}
		</div>
	);
}

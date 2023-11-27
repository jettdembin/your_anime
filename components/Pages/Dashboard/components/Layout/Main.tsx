import UserData from "../../UserData";

type Props = {};

export default function Main({}: Props) {
	return (
		<>
			{/* List of Items (e.g., Anime List) */}
			<div className="container mx-auto py-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Replace with dynamic content */}
					<div className="bg-white p-4 rounded-lg shadow-md">Item 1</div>
					<div className="bg-white p-4 rounded-lg shadow-md">Item 2</div>
					<div className="bg-white p-4 rounded-lg shadow-md">Item 3</div>
				</div>
			</div>
			<div className="container m-auto">
				<UserData data={userData} />
			</div>
		</>
	);
}

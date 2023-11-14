import DraggableList from "./Top10Likes/DraggableList";

export default function Top10Likes({ likes }) {
	const sortedLikes = likes?.sort((a, b) => b?.rating - a?.rating);
	return (
		<div>
			<h2 className="uppercase text-lg font-semibold text-gray-900 pb-2">
				Your Top 10 Anime 🤩
			</h2>
			<DraggableList likes={sortedLikes} />
		</div>
	);
}

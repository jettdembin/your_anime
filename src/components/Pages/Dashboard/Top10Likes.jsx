import AnimeCardLong from "../Home/ui/ListType";

export default function Top10Likes({ likes }) {
	return (
		<ul>
			testeet
			{likes?.map((like, index) => (
				<AnimeCardLong key={like.id} index={index} like={like} />
			))}
		</ul>
	);
}

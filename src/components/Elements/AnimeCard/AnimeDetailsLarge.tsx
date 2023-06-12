import { Media } from "@/src/types/anime";

import { getEmoji, convertTimeUntilAiring } from "@/src/util";

interface AnimeCardProps {
	media: Media;
	// studioName: string;
	// nextEpisodeDays: number | null;
	isLastCard: boolean;
}

const AnimeDetailsLarge = ({ media }: AnimeCardProps) => {
	const { epsiodes, genres = [], status, season, seasonYear } = media;

	const likedPercentage = media?.averageScore;

	const currentEpisode =
		media?.nextAiringEpisode?.episode && media.nextAiringEpisode.episode > 1
			? media.nextAiringEpisode.episode - 1
			: null;
	const hoursUntilNextEpisode = media?.nextAiringEpisode?.timeUntilAiring;

	const nextEpisodeDays = media?.nextAiringEpisode
		? Math.floor(media.nextAiringEpisode.timeUntilAiring / 86400)
		: null;
	const studioName = media?.studios?.nodes[0]?.name || "Unknown";

	return (
		<div className="hidden xl:flex absolute flex-col left-[14.3rem] top-0  w-[25.2rem] h-72">
			<div className="p-4">
				<div className="flex flex-col flex-wr">
					<div className="w-full flex justify-between font-medium">
						<div className="w-3/4">
							<h6 className="text-lg text-gray-800">
								Ep {!!currentEpisode && currentEpisode + 1} airing in
								{nextEpisodeDays === 0
									? ` ${convertTimeUntilAiring(hoursUntilNextEpisode)} hours`
									: ` ${nextEpisodeDays} days`}
							</h6>
						</div>
						<span>
							{getEmoji(likedPercentage)} {likedPercentage}%
						</span>
					</div>
				</div>
				<div className="w-full pt-4 pb-6">
					<h6 className="text-xs text-gray-800 font-semibold">{studioName}</h6>
					<div className="w-full flex gap-2 text-gray-800">
						<p className="text-xs">TV SHOW</p>
						<span
							className="material-icons pt-1 grid place-items-center text-gray-800"
							style={{ fontSize: "7px" }}
						>
							fiber_manual_record
						</span>
						<p className="text-xs">{epsiodes} episodes</p>
					</div>
				</div>
			</div>
			<div className="px-4 py-2 flex justify-between mt-auto bg-genre">
				<div className="flex flex-wrap justify-between gap-2">
					{genres.slice(0, 4).map((genre: any, i: number) => (
						<span
							className="text-xxs font-bold flex items-center bg-yellow-300 rounded-3xl px-2 py-1"
							key={i}
						>
							{genre?.toLowerCase()}
						</span>
					))}
				</div>
				<span className="material-icons cursor-pointer text-blue-100">
					loupe
				</span>
			</div>
		</div>
	);
};

export default AnimeDetailsLarge;

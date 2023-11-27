import React from "react";

type Props = {};

export default function Character({ character }: Props) {
	return (
		<div
			className="grid bg-white"
			style={{ gridTemplateColumns: "20% auto 20%" }}
		>
			<div>
				<img
					className="w-full object-cover rounded-sm"
					src={character.image.large}
					alt={character.image.large}
				/>
			</div>
			<div className="p-4 flex flex-col">
				<h6>Source</h6>
				<p className="mt-1">{character.name.full}</p>
				<p className="mt-auto">
					{character.name.full} - {character.name.full}
				</p>
			</div>
			<div>
				<img
					className="w-full object-cover rounded-sm"
					src={anime.coverImage.extraLarge}
					alt={anime.title.english}
				/>
			</div>
		</div>
	);
}

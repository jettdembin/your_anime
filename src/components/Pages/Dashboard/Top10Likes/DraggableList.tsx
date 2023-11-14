"use client";

import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import AnimeCardLong from "@/src/components/Pages/Home/ui/ListType";

// A function to reorder the list items
const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const DraggableList = ({ likes }) => {
	const [sortedLikes, setSortedLikes] = useState(likes);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}
		if (result.destination.index === result.source.index) {
			return;
		}

		const newLikes = reorder(
			sortedLikes,
			result.source.index,
			result.destination.index
		);

		setSortedLikes(newLikes);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="likes">
				{(provided) => (
					<ul {...provided.droppableProps} ref={provided.innerRef}>
						{likes?.map((like, index) => (
							<Draggable key={like.id} draggableId={like.id} index={index}>
								{(provided) => (
									<li
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<AnimeCardLong like={like} index={index} />
									</li>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default DraggableList;

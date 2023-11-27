import Characters from "./Main/Aside/Characters";
import Relations from "./Main/Aside/Relations";
import Aside from "./Main/Aside";

type Props = {};

export default function Main({
	anime,
	handleAddToLikes,
	ratingModalRef,
}: Props) {
	return (
		<>
			{" "}
			<dialog id="my_modal_2" className="modal">
				<div className="modal-box" ref={ratingModalRef}>
					<h3 className="font-bold text-lg text-white">
						Add to Favorites with a Rating !! 🐱‍🏍
					</h3>
					<section className="mt-4">
						<form
							method="post"
							className="modal-backdrop"
							onSubmit={handleAddToLikes}
						>
							<div className="rating rating-lg rating-half">
								<input
									type="radio"
									name="rating-10"
									className="rating-hidden"
								/>
								<input
									type="radio"
									name="rating-10"
									value={0.5}
									className="bg-green-500 mask mask-star-2 mask-half-1"
								/>
								<input
									type="radio"
									name="rating-10"
									value={1}
									className="bg-green-500 mask mask-star-2 mask-half-2"
								/>
								<input
									type="radio"
									name="rating-10"
									value={1.5}
									className="bg-green-500 mask mask-star-2 mask-half-1"
								/>
								<input
									type="radio"
									name="rating-10"
									value={2}
									className="bg-green-500 mask mask-star-2 mask-half-2"
								/>
								<input
									type="radio"
									name="rating-10"
									value={2.5}
									className="bg-green-500 mask mask-star-2 mask-half-1"
								/>
								<input
									type="radio"
									name="rating-10"
									value={3}
									className="bg-green-500 mask mask-star-2 mask-half-2"
								/>
								<input
									type="radio"
									name="rating-10"
									value={3.5}
									className="bg-green-500 mask mask-star-2 mask-half-1"
								/>
								<input
									type="radio"
									name="rating-10"
									value={4}
									className="bg-green-500 mask mask-star-2 mask-half-2"
								/>
								<input
									type="radio"
									name="rating-10"
									value={4.5}
									className="bg-green-500 mask mask-star-2 mask-half-1"
								/>
								<input
									type="radio"
									name="rating-10"
									value={5}
									className="bg-green-500 mask mask-star-2 mask-half-2"
								/>
							</div>

							<div className="modal-action">
								{/* if there is a button in form, it will close the modal */}
								<button
									className="btn"
									type="submit"
									onClick={() => {
										document.getElementById("my_modal_2").close();
									}}
								>
									Add
								</button>
							</div>
						</form>
					</section>
					<form method="dialog" className="modal-backdrop">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">
							✕
						</button>
					</form>
				</div>
			</dialog>
			<section
				className="grid gap-10"
				style={{ gridTemplateColumns: "270px auto" }}
			>
				<aside>
					<Aside tags={anime?.tags} anime={anime} />
				</aside>
				<section>
					<Relations relations={anime?.relations?.nodes} anime={anime} />
					<Characters characters={anime?.characters?.nodes} anime={anime} />
				</section>
			</section>
		</>
	);
}

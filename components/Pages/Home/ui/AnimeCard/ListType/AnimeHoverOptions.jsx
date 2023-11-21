"use client";

import { useState } from "react";

import { Select } from "@radix-ui/react-select";

import * as HoverCard from "@radix-ui/react-hover-card";

const AnimeHoverOptions = () => {
	const [status, setStatus] = useState(null);

	return (
		<HoverCard.Root>
			<HoverCard.Trigger asChild>
				<span className="material-icons cursor-pointer text-blue-100 relative">
					loupe
					{/* <AnimatePresence>
						{isAnimeHoverOptionsHovered && (
							<motion.div
								initial={{ opacity: 0, y: "-100%" }}
								animate={{ opacity: 1, y: "-120%" }}
								exit={{ opacity: 0, y: "-100%" }}
								transition={{ duration: 0.2 }}
								className="absolute top-0 rounded-lg shadow-md bg-white z-40"
							>
								
							</motion.div>
						)}
					</AnimatePresence> */}
				</span>
			</HoverCard.Trigger>
			<HoverCard.Portal>
				<HoverCard.Content
					data-side="bottom"
					side="top"
					className="HoverCardContent z-50"
					sideOffset={5}
				>
					{/* <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
						<img
							className="Image large"
							src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
							alt="Radix UI"
						/>
						<div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
							<div>
								<div className="Text bold">Radix</div>
								<div className="Text faded">@radix_ui</div>
							</div>
							<div className="Text">
								Components, icons, colors, and templates for building
								high-quality, accessible UI. Free and open-source.
							</div>
							<div style={{ display: "flex", gap: 15 }}>
								<div style={{ display: "flex", gap: 5 }}>
									<div className="Text bold">0</div>{" "}
									<div className="Text faded">Following</div>
								</div>
								<div style={{ display: "flex", gap: 5 }}>
									<div className="Text bold">2,900</div>{" "}
									<div className="Text faded">Followers</div>
								</div>
							</div>
						</div>
					</div> */}
					{/* <div className="w-full text-black">
						<div
							className={`flex gap-2 ${status === "watching" ? "active" : ""}`}
							onClick={() => setStatus("watching")}
						>
							<span className="material-icons">visibility</span>
							<span>Completed</span>
						</div>
						<div
							className={`flex gap-2 ${status === "maybe" ? "active" : ""}`}
							onClick={() => setStatus("maybe")}
						>
							<span className="material-icons">help_outline</span>
							<span>Watching</span>
						</div>
						<div
							className={`flex gap-2 ${status === "maybe" ? "active" : ""}`}
							onClick={() => setStatus("maybe")}
						>
							<span className="material-icons">help_outline</span>
							<span>Considering</span>
						</div>
						<div
							className={`flex gap-2 ${
								status === "notwatching" ? "active" : ""
							}`}
							onClick={() => setStatus("notwatching")}
						>
							<span className="material-icons">visibility_off</span>
							<span>Dropped</span>
						</div>
					</div> */}
					<div className="grid grid-cols-2 gap-2">
						<div>
							<label
								for="library_editor_statusSelect"
								className="block text-sm font-medium text-gray-700"
							>
								Status
							</label>
							<select value={status} onValueChange={setStatus}>
								<option value="completed">Completed</option>
								<option value="rewatching">Rewatching</option>
								<option value="watching">Watching</option>
								<option value="planning">Planning</option>
								<option value="considering">Considering</option>
								<option value="paused">Paused</option>
								<option value="dropped">Dropped</option>
								<option value="skipping">Skipping</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Rating
							</label>
							<select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
								<option value="10">10 (Masterpiece)</option>
								<option value="9">9 (Incredible)</option>
								<option value="8">8 (Great)</option>
								<option value="7">7 (Good)</option>
								<option value="6">6 (Okay)</option>
								<option value="5">5 (Mediocre)</option>
								<option value="4">4 (Poor)</option>
								<option value="3">3 (Bad)</option>
								<option value="2">2 (Awful)</option>
								<option value="1">1 (Atrocious)</option>
								<option value="">–</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Progress
							</label>
							<input
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								name="rewatches"
								type="number"
								min="0"
								max="999"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Full Rewatches
							</label>
							<input
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								name="rewatches"
								type="number"
								min="0"
								max="999"
								required
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Started
							</label>
							<input
								id="library_editor_startedAt"
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								name="started_at"
								type="date"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Finished
							</label>
							<input
								id="library_editor_finishedAt"
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								name="finished_at"
								type="date"
							/>
						</div>
						<div className="col-span-full">
							<label className="block text-sm font-medium text-gray-700">
								Personal Notes
							</label>
							<textarea
								id="library_editor_notes"
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								name="notes"
								rows="6"
							></textarea>
							<small className="text-secondary">
								<span>Only visible to you</span>
								<span className="float-right">500 / 500</span>
							</small>
						</div>
					</div>
					<HoverCard.Arrow className="HoverCardArrow" />
				</HoverCard.Content>
			</HoverCard.Portal>
		</HoverCard.Root>
	);
};

export default AnimeHoverOptions;

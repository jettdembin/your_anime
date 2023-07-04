"use client";

import { useState } from "react";
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
					data-side="top"
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
					<div className="w-full text-black">
						<div
							className={`flex gap-2 ${status === "watching" ? "active" : ""}`}
							onClick={() => setStatus("watching")}
						>
							<span className="material-icons">visibility</span>
							<span>Watching</span>
						</div>
						<div
							className={`flex gap-2 ${status === "maybe" ? "active" : ""}`}
							onClick={() => setStatus("maybe")}
						>
							<span className="material-icons">help_outline</span>
							<span>Maybe Watching</span>
						</div>
						<div
							className={`flex gap-2 ${
								status === "notwatching" ? "active" : ""
							}`}
							onClick={() => setStatus("notwatching")}
						>
							<span className="material-icons">visibility_off</span>
							<span>Not Watching</span>
						</div>
					</div>
					<HoverCard.Arrow className="HoverCardArrow" />
				</HoverCard.Content>
			</HoverCard.Portal>
		</HoverCard.Root>
	);
};

export default AnimeHoverOptions;

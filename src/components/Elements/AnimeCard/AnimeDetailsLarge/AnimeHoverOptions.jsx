import { useState } from "react";

const AnimeHoverOptions = () => {
	const [status, setStatus] = useState(null);

	return (
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
				className={`flex gap-2 ${status === "notwatching" ? "active" : ""}`}
				onClick={() => setStatus("notwatching")}
			>
				<span className="material-icons">visibility_off</span>
				<span>Not Watching</span>
			</div>
		</div>
	);
};

export default AnimeHoverOptions;

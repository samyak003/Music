import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useStateValue } from "../StateProvider";

function Player() {
	const [{ token, uri }] = useStateValue();
	const [play, setPlay] = useState(false);
	useEffect(() => setPlay(true), [uri]);
	if (!token) return null;
	return (
		<div className="player">
			<SpotifyPlayer
				className="spotifyPlayer"
				token={token}
				play={play}
				callback={(state) => {
					if (!state.isPlaying) {
						setPlay(false);
					}
				}}
				showSaveIcon
				uris={uri ? [uri] : []}
				name="Music"
				syncExternalDevice
				magnifySliderOnHover
				styles={{
					activeColor: "#fff",
					bgColor: "#333333",
					color: "#fff",
					loaderColor: "#fff",
					sliderColor: "#1cb954",
					trackArtistColor: "gray",
					trackNameColor: "rgb(225, 225, 225)",
					sliderHandleColor: "rgb(225, 225, 225)",
				}}
			/>
		</div>
	);
}

export default Player;

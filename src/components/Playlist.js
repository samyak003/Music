import { Button } from "@material-ui/core";
import { PlayCircleOutline } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Item from "./Item";

function Playlist({ spotify }) {
	const [, dispatch] = useStateValue();
	const location = useLocation();
	const [items, setItems] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		if (location.state.type === "playlist") {
			spotify.getPlaylistTracks(id).then((tracks) => {
				setItems(tracks.items);
			});
		} else if (location.state.type === "album") {
			spotify.getAlbumTracks(id).then((tracks) => {
				setItems(tracks.items);
			});
		}
	}, [id, location, spotify]);
	return (
		<section className="playlist">
			<header className="playlist__header">
				<figure className="pageImgContainer">
					<img src={location.state.imgLink} alt={location.state.title} />
				</figure>
				<div className="playlist__details">
					<h2>{location.state.title}</h2>
				</div>
				<Button
					onClick={() => {
						dispatch({
							type: "SET_URI",
							uri: location.state.uri,
						});
					}}
					endIcon={<PlayCircleOutline />}
				>
					Play
				</Button>
			</header>
			<main className="playlist__tracks">
				{items.map((track, index) => {
					if (location.state.type === "album") {
						var _track = track;
						var _img = location.state.imgLink;
						var _uri = track.uri;
					} else {
						_track = track.track;
						_img = track.track.album.images[0]?.url;
						_uri = _track.uri;
					}
					return (
						<Item
							key={index}
							title={_track?.name}
							id={_track?.id}
							imgLink={_img}
							type="track"
							uri={_uri}
							landscape
						/>
					);
				})}
			</main>
		</section>
	);
}

export default Playlist;

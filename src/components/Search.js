import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		maxWidth: "700px",
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "40ch",
			},
		},
	},
}));
function Search({ spotify }) {
	const classes = useStyles();
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);

	const search = (event) => {
		event.preventDefault();
		spotify
			.search(searchInput, ["album", "artist", "playlist", "track"])
			.then((result) => {
				setResults([
					...result.tracks.items,
					...result.albums.items,
					...result.playlists.items,
				]);
			});
	};
	return (
		<section className="search">
			<article className={classes.search}>
				<form onSubmit={search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</form>
			</article>
			<article className="searchResults">
				{results && <p>Found {results.length} results for this quary.</p>}
				{results?.map((item, index) => {
					return (
						<Item
							key={index}
							title={item?.name}
							imgLink={
								item.type === "playlist" || item.type === "album"
									? item?.images[0].url
									: item?.album.images[0]?.url
							}
							type={item?.type}
							id={item?.id}
							landscape
							uri={item?.uri}
						/>
					);
				})}
			</article>
		</section>
	);
}

export default Search;

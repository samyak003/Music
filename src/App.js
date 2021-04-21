import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getTokenFromUrl } from "./spotify";
import { useEffect, Suspense, lazy } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import Playlist from "./components/Playlist";
import Player from "./components/Player";
import Login from "./components/Login";
import { useMediaQuery } from "@material-ui/core";

const Home = lazy(() => import("./components/Home"));
const Drawer = lazy(() => import("./components/Drawer"));
const BottomNav = lazy(() => import("./components/BottomNav"));
const Search = lazy(() => import("./components/Search"));

const spotify = new SpotifyWebApi();
function App() {
	const [{ token }, dispatch] = useStateValue();
	const mobile = useMediaQuery("(min-width:750px)");

	useEffect(() => {
		const hash = getTokenFromUrl();
		window.location.hash = "";
		const _token = hash.access_token;
		if (_token) {
			dispatch({
				type: "SET_TOKEN",
				token: _token,
			});
			spotify.setAccessToken(_token);
			spotify.getMe().then((user) => {
				dispatch({
					type: "SET_USER",
					user: user,
				});
			});
			spotify.getUserPlaylists().then((playlists) => {
				dispatch({
					type: "ADD_TO_HOME__ROWS",
					home__row: { title: "Your Playlists", ...playlists },
				});
			});
			spotify.getNewReleases().then((new_releases) => {
				dispatch({
					type: "ADD_TO_HOME__ROWS",
					home__row: { title: "New Releases", ...new_releases.albums },
				});
			});
			spotify.getMyRecentlyPlayedTracks().then((recent) => {
				dispatch({
					type: "ADD_TO_HOME__ROWS",
					home__row: { title: "Recently Played", ...recent },
				});
			});
		}
	}, [dispatch]);
	const routes = [
		{ path: "/search", component: <Search spotify={spotify} /> },
		{ path: "/playlist/:id", component: <Playlist spotify={spotify} /> },
		{ path: "/album/:id", component: <Playlist spotify={spotify} /> },
		{ path: "/", component: <Home /> },
	];
	return (
		<div className="App">
			{!token ? (
				<Login />
			) : (
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						{mobile && <Drawer />}
						<Switch>
							{routes.map((route) => (
								<Route path={route.path}>
									<div style={{ width: "100%" }}>
										{route.component}
										<Player />
									</div>
								</Route>
							))}
						</Switch>
						{!mobile && (
							<div className="bottom_nav">
								<BottomNav />
							</div>
						)}
					</Suspense>
				</Router>
			)}
		</div>
	);
}

export default App;

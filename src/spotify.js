export const authEndPoint = "https://accounts.spotify.com/authorize";
const redirectUri = "https://music-c8629.web.app/";
const clientId = process.env.REACT_APP_CLIENT_ID;
const scopes = [
	"user-read-recently-played",
	"user-top-read",
	"user-read-playback-position",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"app-remote-control",
	"streaming",
	"playlist-read-private",
	"playlist-read-collaborative",
	"user-follow-read",
	"user-library-modify",
	"user-library-read",
	"user-read-email",
	"user-read-private",
];
export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
	"%20",
)}&response_type=token&show_dialog=true`;
export const getTokenFromUrl = () => {
	return window.location.hash
		.substring(1)
		.split("&")
		.reduce((initial, item) => {
			let parts = item.split("=");
			initial[parts[0]] = decodeURIComponent(parts[1]);
			return initial;
		}, {});
};

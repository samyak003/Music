export const initialState = {
	user: null,
	home__rows: [],
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_TOKEN":
			return {
				...state,
				token: action.token,
			};
		case "SET_URI":
			return {
				...state,
				uri: action.uri,
			};
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		case "SET_PLAYLISTS":
			return {
				...state,
				playlists: action.playlists,
			};
		case "ADD_TO_HOME__ROWS":
			return {
				...state,
				home__rows: [...state.home__rows, action.home__row],
			};

		case "SET_PLAYING":
			return {
				...state,
				playing: action.playing,
			};

		case "SET_ITEM":
			return {
				...state,
				item: action.item,
			};
		default:
			return state;
	}
};

export default reducer;

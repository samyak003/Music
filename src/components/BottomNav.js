import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles({
	root: {
		background: "#333333",
	},
	btn: {
		color: "rgb(225, 225, 225)",
	},
});

export default function BottomNav() {
	const classes = useStyles();
	const history = useHistory();
	const [, dispatch] = useStateValue();
	const [value, setValue] = React.useState(0);
	const signOut = () => {
		dispatch({
			type: "SET_USER",
			user: null,
		});
		dispatch({
			type: "SET_TOKEN",
			token: null,
		});
	};
	const drawerItems = [
		{
			title: "Home",
			icon: <HomeIcon className={classes.btn} />,
			onClick: () => history.push("/"),
		},
		{
			title: "Search",
			icon: <SearchIcon className={classes.btn} />,
			onClick: () => history.push("/search"),
		},
		{
			title: "Sign Out",
			icon: <ExitToAppIcon className={classes.btn} />,
			onClick: signOut,
		},
	];

	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
			}}
			showLabels
			className={classes.root}
		>
			{drawerItems.map((item) => (
				<BottomNavigationAction
					label={item.title}
					onClick={item.onClick}
					icon={item.icon}
					className={classes.btn}
				/>
			))}
		</BottomNavigation>
	);
}

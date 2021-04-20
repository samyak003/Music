import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import {
	List,
	Divider,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		background: "#333333",
		color: "rgb(225, 225, 225)",
	},
	icon: {
		color: "rgb(225, 225, 225)",
	},
	// necessary for content to be below app bar
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function PermanentDrawerLeft() {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [, dispatch] = useStateValue();

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			open={open}
			anchor="left"
			onClose={() => setOpen(false)}
			classes={{ paper: classes.drawerPaper }}
		>
			<List>
				<ListItem button onClick={() => history.push("/")}>
					<ListItemIcon>
						<HomeIcon className={classes.icon} />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button onClick={() => history.push("/search")}>
					<ListItemIcon>
						<SearchIcon className={classes.icon} />
					</ListItemIcon>
					<ListItemText primary="Search" />
				</ListItem>
				<ListItem
					button
					onClick={() => {
						dispatch({
							type: "SET_USER",
							user: null,
						});
						dispatch({
							type: "SET_TOKEN",
							token: null,
						});
					}}
				>
					<ListItemIcon>
						<ExitToAppIcon className={classes.icon} />
					</ListItemIcon>
					<ListItemText primary="Sign Out" />
				</ListItem>
			</List>
			<Divider />
		</Drawer>
	);
}

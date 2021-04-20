import { Avatar, ButtonBase } from "@material-ui/core";
import React from "react";
import { useStateValue } from "../StateProvider";
import HomeRow from "./HomeRow";

function Home() {
	const [{ user, home__rows }] = useStateValue();

	return (
		<div className="home">
			<div className="home__header">
				<h2>Welcome {user?.display_name}</h2>
				<ButtonBase>
					{user?.images.length > 0 ? (
						<Avatar alt={user?.display_name} src={user?.images[0].url} />
					) : (
						<Avatar alt={user?.display_name}>{user?.display_name[0]}</Avatar>
					)}
				</ButtonBase>
			</div>
			<div className="home__rows">
				{home__rows?.map((home__row, index) => (
					<HomeRow
						title={home__row.title}
						key={index}
						items={home__row.items}
					/>
				))}
			</div>
		</div>
	);
}

export default Home;

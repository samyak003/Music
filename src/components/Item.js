import { ButtonBase } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { useStateValue } from "../StateProvider";

function Item({
	title,
	imgLink,
	landscape = false,
	description = null,
	type,
	id,
	uri = null,
}) {
	const [, dispatch] = useStateValue();
	const history = useHistory();
	const handleClick = () => {
		if (type === "playlist" || type === "album")
			history.push(`/${type}/${id}`, {
				title: title,
				imgLink: imgLink,
				type: type,
				uri: uri,
			});
	};

	const play = () => {
		if (uri && type === "track") {
			dispatch({
				type: "SET_URI",
				uri: uri,
			});
		}
	};
	return (
		<div className={landscape ? "landscape item" : "item"} onClick={play}>
			<ButtonBase
				className={landscape ? "landscapeBtn itemBtn" : "itemBtn"}
				onClick={handleClick}
			>
				<figure className={landscape ? "landscapeImg itemImg" : "itemImg"}>
					<img src={imgLink} alt={title} />
				</figure>
				<div
					className={
						landscape ? "itemDetails landscapeItemDetails" : "itemDetails"
					}
				>
					<p className="itemTitle">{title}</p>
					{description && <p>{description}</p>}
				</div>
			</ButtonBase>
		</div>
	);
}

export default Item;

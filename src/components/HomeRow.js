import React from "react";
import Item from "./Item";

function HomeRow({ title, items }) {
	return (
		<div className="homerow">
			<h2>{title}</h2>
			<div className="homerow__rowItems">
				{items?.map((item, index) => {
					if (item?.track) {
						// track
						return (
							<Item
								key={index}
								title={item?.track.name}
								imgLink={item?.track.album.images[0]?.url}
								type={item?.track.type}
								id={item?.id}
								uri={item?.track.uri}
							/>
						);
					}
					return (
						//album or playlist
						<Item
							key={index}
							title={item?.name}
							imgLink={item?.images[0].url}
							type={item?.type}
							id={item?.id}
							uri={item?.uri}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default HomeRow;

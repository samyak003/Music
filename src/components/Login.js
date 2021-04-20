import React from "react";
import { loginUrl } from "../spotify";
function Login() {
	return (
		<div
			style={{
				display: "grid",
				placeItems: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<a
				href={loginUrl}
				style={{
					padding: "10px 40px",
					borderRadius: "4px",
					color: "white",
					background: "#424242",
					textDecoration: "none",
				}}
			>
				Login with Spotify
			</a>
		</div>
	);
}

export default Login;

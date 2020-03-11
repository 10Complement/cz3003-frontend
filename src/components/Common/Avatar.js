import React from "react";
import Image from "react-bootstrap/Image";
import Pic from "./images/fruit_shop.jpg";
export default function(props) {
	return (
		<div className={props.className}>
			<Image src={Pic} style={props.size} roundedCircle />
		</div>
	);
}

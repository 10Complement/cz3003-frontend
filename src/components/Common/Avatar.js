import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Pic from "./images/fruit_shop.jpg";
export default function(props) {
	return (
		<div className={props.className}>
			<Image src={Pic} style={props.size} roundedCircle />
			{props.image}
		</div>
	);
}

import React from "react";
import Button from "react-bootstrap/Button";
import { FaHome } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

/* export default function(props) {
	return <Button>{props.label}</Button>;
}    */
export default function(props) {
	if (props.label === "Home")
		return (
			<Button variant="outline-dark">
				<FaHome />
			</Button>
		);
	if (props.label === "Star")
		return (
			<Button variant="outline-dark">
				<AiOutlineStar />
			</Button>
		);
	if (props.label === "Medal")
		return (
			<Button variant="outline-dark">
				<FaMedal />
			</Button>
		);
	if (props.label === "Trophy")
		return (
			<Button variant="outline-dark">
				<AiFillTrophy />
			</Button>
		);
}

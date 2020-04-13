import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import { UserContext } from "../../contexts/UserContext";
//import Pic from "./images/fruit_shop.jpg";
export default function (props) {
	const { student } = useContext(UserContext);
	const { avatar_url } = student;
	console.log(avatar_url);
	return (
		<div className={props.className}>
			<Image
				src={
					"https://storage.googleapis.com/complement-4254e.appspot.com/" +
					avatar_url +
					".jpg"
				}
				style={props.size}
				roundedCircle
			/>
			{props.image}
		</div>
	);
}

import React from "react";
import Button from "react-bootstrap/Button";
import { FaHome } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai"; 
import { FaGlobeAsia } from "react-icons/fa"; 

const buttonStyle = {
	color: 'black',
	border: '2px',
	backgroundColor: 'white',
	fontFamily : 'inherit',
	height: '50px',
	width: '200px',
	borderColor: 'black', 
	textAlign: 'left',
	//flex: '1',
    paddingLeft: '10px',
  };

const lineStyle = {
	transform: 'rotate(90deg) translateY(25px) translateX(-32px)',
	//height: '25px',
	width: '50px',
	background: 'grey',
  };  

export default function(props) {
	if (props.message === "Home")
		return (		
				<Button style={buttonStyle} variant="outline-dark" size="lg">
					<FaHome icon={FaHome} size = '30'/>Home
					<hr style={lineStyle}></hr>
				</Button>
		);
	if (props.message === "Star")
		return (
			<Button variant="outline-dark" size="lg">
				<AiOutlineStar />
			</Button>
		);
	if (props.message === "Medal")
		return (
			<Button variant="outline-dark" size="lg">
				<FaMedal />
			</Button>
		);
	if (props.message === "Trophy" )
		return (
			<Button variant="outline-dark" size="lg">
				<AiFillTrophy />
			</Button>
		);

	if (props.message === "World")
		return (
			<Button variant="outline-dark" size="lg">
				<FaGlobeAsia icon={FaGlobeAsia} size = '30'/>   World
			</Button>
		);
}
  

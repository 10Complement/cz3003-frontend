import React from "react";
import Button from "react-bootstrap/Button";
import { FaHome } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai"; 
import { FaGlobeAsia } from "react-icons/fa"; 

const buttonStyle = {
	//color: 'black',
	border: '5px',
	//backgroundColor: 'white',
	fontFamily : 'sans-serif',
	height: '50px',
	width: '170px',
	borderColor: 'black', 
	textAlign: 'left',
	//flex: '1',
    paddingLeft: '10px',
  };

const lineStyle = {
	transform: 'rotate(90deg) translateY(30px) translateX(-32px)',
	//height: '25px',
	width: '50px',
	background: 'white',
  };  

export default function(props) {
	if (props.icon === "Home")
		return (		
				<Button style={buttonStyle} variant="dark" size="lg">
					<FaHome icon={FaHome} size = '30' paddingLeft='100px' textAlign= 'left'/>
					<text style={{paddingLeft:'40px', margin:'0'}}>{props.message}</text>
					<hr style={lineStyle}></hr>
				</Button>
		);
	if (props.icon === "Star")
		return (
			<Button style={buttonStyle} variant="info" size="lg">
				<AiOutlineStar icon={AiOutlineStar} size = '30' paddingLeft='100px' textAlign= 'left'/>
				<text style={{paddingLeft:'40px', margin:'0'}}>{props.message}</text>
				<hr style={lineStyle}></hr>
			</Button>
		);
	if (props.icon === "Medal")
		return (
			<Button style={buttonStyle} variant="info" size="lg">
				<FaMedal icon={FaMedal} size = '30' paddingLeft='100px' textAlign= 'left'/>
				<text style={{paddingLeft:'40px', margin:'0'}}>{props.message}</text>
				<hr style={lineStyle}></hr>
			</Button>
		);
	if (props.icon === "Trophy" )
		return (
			<Button style={buttonStyle} variant="info" size="lg">
				<AiFillTrophy icon={AiFillTrophy} size = '30' paddingLeft='100px' textAlign= 'left'/>
				<text style={{paddingLeft:'40px', margin:'0'}}>{props.message}</text>
				<hr style={lineStyle}></hr>
			</Button>
		);

	if (props.icon === "World")
		return (
			<Button style={buttonStyle} variant="info" size="lg">
				<FaGlobeAsia icon={FaGlobeAsia} size = '30' paddingLeft='100px' textAlign= 'left'/>  
				<text style={{paddingLeft:'40px', margin:'0'}}>{props.message}</text>
				<hr style={lineStyle}></hr>
			</Button>
		);

	if (props.icon === "")
		return (
			<Button style={buttonStyle} variant="info" size="lg">
				{props.message}
			</Button>
		);
}
  

/* import React from "react";
import "./App.css";
import routes from "./routes/common";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { NavbarContainer } from "./components/Navbar";

/*  Master App component that provides routing and encapsulates all components */

const classes = {
  main: {
    marginTop: "56px",
    flexGrow: 1
  }
};

export default function() {
  return (
    <Router>
      <NavbarContainer title="Quest Game" />
      <div style={classes.main}>
        <Switch>{routes}</Switch>
      </div>
    </Router>
  );
}
 */

import React from "react";
import Button from "react-bootstrap/Button";
import { FaHome } from 'react-icons/fa';
import { FaMedal } from 'react-icons/fa';
import { AiFillTrophy } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai"; 

/* export default function(props) {
	return <Button>{props.label}</Button>;
}    */
export default function(props) {
	// if(props.label = "Home")
		return (		
			<Button variant="outline-dark"><FaHome /></Button>
			/* <Button variant="outline-dark"><AiOutlineStar /></Button>
		 	<Button variant="outline-dark"><FaMedal /></Button>
			<Button variant="outline-dark"><AiFillTrophy /></Button> */
	)
	/* if(props.label = "Star")
		return (		
			<Button variant="outline-dark"><AiOutlineStar /></Button>
	)
	if(props.label = "Medal")
		return (		
			<Button variant="outline-dark"><FaMedal /></Button>
	)
	if(props.label = "Trophy")
		return (		
			<Button variant="outline-dark"><AiFillTrophy /></Button>
	) */
}

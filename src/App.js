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
import IconButton from "./components/Common/IconButton"; 
import Add from '@material-ui/icons/AddCircleOutline';
import Subtract from '@material-ui/icons/Remove';
import Mulitply from '@material-ui/icons/HighlightOff';

//importing icons from: https://material-ui.com/components/material-icons/

export default function() {
    return (
      <div>
		    <IconButton icon={Subtract} message="Subtraction" stars="1"/>
      </div>
	)
}  

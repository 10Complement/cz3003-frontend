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

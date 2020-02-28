import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from 'material-ui-rating'

const useStyles = makeStyles(theme => ({
	button: {
	  margin: theme.spacing(1),
	},
  }));
  
export default function(props) {
	const stars = props.stars || 0
	const classes = useStyles();
		return (		
			<div align="center"> 
					<Button
						variant="contained"
						color="default"
						className={classes.button}
						startIcon={<props.icon/>}
						size="large">
					{props.message}
					</Button>
				
					<Box component="fieldset" mb={4} borderColor="transparent">
							<Rating name="read-only" value= {stars} max='3' readOnly />
					</Box> 			
			</div>
		);
}
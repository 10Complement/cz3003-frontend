import React from "react";
import Container from "react-bootstrap/Container"; // Container from react-bootstrap
import Navbar from "react-bootstrap/Navbar"; // Navbar from react-bootstrap
import Table from "react-bootstrap/Table";

export default function() {

	const data = {"U1720526F":5, "U1720035E":7, "U1723077R":2};
	
	return (
		<Container size= "sm">
		<Table striped bordered hover variant="dark">
		<thead>
			<tr>
			<th>#</th>
			<th>Player ID</th>
			<th>Score</th>
			
			</tr>
		</thead>
		<tbody>
			<tr>
			<td>1</td>
			<td>sda</td>
			<td>{data.U1720035E}</td>
			
			</tr>
			<tr>
			<td>2</td>
			<td>Jacob</td>
			<td>3</td>
			
			</tr>
			<tr>
			<td>3</td>
			<td>Larry the Bird</td>
			<td>2</td>
			</tr>
		</tbody>
		</Table>
		</Container>
	);
}

import React from "react";
import IconButton from "./components/Common/IconButton"; 
import Table from './components/Common/Table.js';

export default function() {
    return (
      <div>
		<IconButton icon="Home" message="Home"/>
      </div>
	)
}  

/* export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state={
        tableData:[
          {'Name': 'Abc', 'Age': 15, 'Location': 'Bangalore'},
          {'Name': 'Def', 'Age': 43, 'Location': 'Mumbai'},
          {'Name': 'Uff', 'Age': 30, 'Location': 'Chennai'},
          {'Name': 'Ammse', 'Age': 87, 'Location': 'Delhi'},
          {'Name': 'Yysse', 'Age': 28, 'Location': 'Hyderabad'}
      ]
      }
    }
   
    render() {           
        return (
          <div className="App">
            <br/>
            <Table data={this.state.tableData}/>
          </div>
          
        );
    } 
} */
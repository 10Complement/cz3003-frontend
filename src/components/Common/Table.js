import React from 'react';
import Table from 'react-bootstrap/Table'

export default class Table1 extends React.Component  {
    
    constructor(props){
      super(props);
      this.getTableHeader = this.getTableHeader.bind(this);
      this.getTableData = this.getTableData.bind(this);
      this.getKeys = this.getKeys.bind(this);
    } 
    // Get list of headings - keys
    // Get keys from any obj - all objs must have the same keys
    getKeys = function(){
      return Object.keys(this.props.data[0]);
    }
    
    // Get header component of table
    getTableHeader = function(){
      var keys = this.getKeys();
      return keys.map((key, index)=>{
        return <th key={key}>{key.toUpperCase()}</th>
      })
    }
    
    // Get data 
    getTableData = function(){
      var dataItems = this.props.data;
      var keys = this.getKeys();
      return dataItems.map((row, index)=>{
        return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
      })
    }
    
    render() {
        return (
          <div>
            <Table striped bordered hover>
            <thead>
              <tr> 
                {this.getTableHeader()}
              </tr>
            </thead>
            <tbody>
              {this.getTableData()}
            </tbody>
            </Table>
          </div>
          
        );
    }
}
// Get columns of a particular row
const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}
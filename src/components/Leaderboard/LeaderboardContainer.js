import React from 'react';
import Container from "react-bootstrap/Container"; // Container from react-bootstrap
import MaterialTable from "material-table";
import { forwardRef } from 'react';

//Icons for table
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const styles = {
	leaderboardContainer: {
		paddingTop: '20px',
		paddingBottom: '20px'
	}
}

export default function() {
	
	const data = [
		{name: 'Russell', studentID: 'U1720526FC', class: 'TSP8', progress: '1-1', stars: 2, medals: 4},
		{name: 'David', studentID: 'U1720925C', class: 'TSP5', progress: '1-1', stars: 3, medals: 0},
		{name: 'Alex', studentID: 'U1722845D', class: 'TSP4', progress: '1-1', stars: 1, medals: 1}
	] //Replace by formatting after API call
	
	return (
		<Container size= "sm" style={styles.leaderboardContainer}>
			<MaterialTable
				icons={tableIcons}
				title="Leaderboard"
				columns={[
					{title: 'Avatar', field: 'avatar', filtering: false, render: rowData => 
						<img src={rowData.avatar} style={{width: 40, borderRadius: '50%'}}/>},
					{title: 'Name', field: 'name'},
					{title: 'Student ID', field: 'studentID'},
					{title: 'Class', field: 'class'},
					{title: 'Current Progress', field: 'progress'},
					{title: 'Stars', field: 'stars'},
					{title: 'Medals', field: 'medals'}
				]}
				data={data}        
				actions={[
					{
					icon: SaveAlt,
					tooltip: 'Generate report',
					onClick: (event, rowData) => alert("You generated a report for " + rowData.name) //Replace with generate report function
					}
				]}
				options={{
					exportButton: true,
					filtering: true,
					sorting: true,
					actionsColumnIndex: -1
				}}
			/>
		</Container>
	);
}

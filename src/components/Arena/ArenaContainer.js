import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from "react-bootstrap/Container";

import TabPanel from "./TabPanel";
import QuestionPanel from "./QuestionPanel";
import AssignmentPanel from "./AssignmentPanel";

const styles = {
	container: {
		paddingTop: "20px",
		paddingBottom: "20px"
	}
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SimpleTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container style={styles.container}>
            <AppBar position="static" color="default">
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                <Tab label="Questions" {...a11yProps(0)} />
                <Tab label="Assignments" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <QuestionPanel />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AssignmentPanel />
            </TabPanel>
        </Container>
    );
}

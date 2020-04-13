import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { SectionContainer } from "../components/Section";
import { OverviewContainer } from "../components/Overview";
import { WorldContainer } from "../components/World";
import { LeaderboardContainer } from "../components/Leaderboard";
import { LoginContainer } from "../components/Login";
import { ArenaContainer, ArenaQuestionContainer, NewArenaQuestionContainer, NewAssignmentContainer, 
	AssignmentContainer } from "../components/Arena";

export default () => {
	return (
		<Switch>
			<Route exact path="/login" component={LoginContainer} />
			<ProtectedRoute
				exact
				path="/world/:wID/section/:sID"
				component={SectionContainer}
			/>
			<ProtectedRoute exact path="/world/:wID" component={WorldContainer} />
			<ProtectedRoute exact path="/leader" component={LeaderboardContainer} />
			<ProtectedRoute exact path="/arena/assignment/new" component={NewAssignmentContainer} />
			<ProtectedRoute exact path="/arena/assignment/:aID" component={AssignmentContainer} />
			<ProtectedRoute
				exact
				path="/arena/question/new"
				component={NewArenaQuestionContainer}
			/>
			<ProtectedRoute
				exact
				path="/arena/question/:qID"
				component={ArenaQuestionContainer}
			/>
			<ProtectedRoute exact path="/arena" component={ArenaContainer} />
			<ProtectedRoute exact path="/profile" component={ProfileContainer} />
			<ProtectedRoute path="/" component={OverviewContainer} />
		</Switch>
	);
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { user } = useContext(UserContext);
	const isAuthenticated = user.isAuthenticated();

	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated) return <Component {...props} />;
				else
					return (
						<Redirect
							to={{ pathname: "/login", state: { from: props.location } }}
						/>
					);
			}}
		></Route>
	);
};

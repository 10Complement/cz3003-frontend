import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { SectionContainer } from "../components/Section";
import { OverviewContainer } from "../components/Overview";
import { WorldContainer } from "../components/World";
import { LeaderboardContainer } from "../components/Leaderboard";
import { LoginContainer } from "../components/Login";
import { ArenaContainer } from "../components/Arena";
import { ArenaQuestionContainer } from "../components/Arena";
import { NewArenaQuestionContainer } from "../components/Arena";
import { ProfileContainer } from "../components/Profile";

export default () => {
	return (
		<Switch>
			<Route exact path="/login" component={LoginContainer} />
			<ProtectedRoute
				exact
				key="section"
				path="/world/:wID/section/:sID"
				component={SectionContainer}
			/>
			<ProtectedRoute exact path="/world/:wID" component={WorldContainer} />
			<ProtectedRoute exact path="/leader" component={LeaderboardContainer} />
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
	const { student } = useContext(UserContext);
	const isAuthenticated = student.matric ? true : false;

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

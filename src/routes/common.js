import React from "react";
import { Route } from "react-router-dom";

import { SectionContainer } from "../components/Section";
import { OverviewContainer } from "../components/Overview";
import { WorldContainer } from "../components/World";
import { LeaderboardContainer } from "../components/Leaderboard";
import { LoginContainer } from "../components/Login";
import { ArenaContainer, ArenaQuestionContainer, NewArenaQuestionContainer, NewAssignmentContainer, 
	AssignmentContainer } from "../components/Arena";

export default [
	<Route key="section" path="/world/:wID/section/:sID" component={SectionContainer} />,
	<Route key="world" path="/world/:wID" component={WorldContainer} />,
	<Route key="leaderboard" path="/leader" component={LeaderboardContainer} />,
	<Route key="login" path="/login" component={LoginContainer} />,
	<Route key="newArenaQuestion" path="/arena/question/new" component={NewArenaQuestionContainer} />,
	<Route key="arenaQuestion" path="/arena/question/:qID" component={ArenaQuestionContainer} />,
	<Route key="newAssignment" path="/arena/assignment/new" component={NewAssignmentContainer} />,
	<Route key="assignment" path="/arena/assignment/:aID" component={AssignmentContainer} />,
	<Route key="arena" path="/arena" component={ArenaContainer} />,
	<Route key="overview" path="/" component={OverviewContainer} />
];

import React from "react";
import { Route } from "react-router-dom";

import { SectionContainer } from "../components/Section";
import { OverviewContainer } from "../components/Overview";
import { WorldContainer } from "../components/World";
import { LeaderboardContainer } from "../components/Leaderboard";

export default [
	<Route key="section" path="/world/:wID/section/:sID" component={SectionContainer} />,
	<Route key="world" path="/world/:wID" component={WorldContainer} />,
	<Route key="leaderboard" path="/leader" component={LeaderboardContainer} />,
	<Route key="overview" path="/" component={OverviewContainer} />
	
];

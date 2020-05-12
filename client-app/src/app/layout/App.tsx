import React, { useEffect, Fragment, useContext } from "react";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import { LoadingComponent } from "./LoadingComponent";
import ActivityStore from "../store/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
	const activityStore = useContext(ActivityStore);

	//everytime component renders useEffect will be called
	useEffect(() => {
		activityStore.loadActivities();
		// need to pass second parameter as an empty array to prevent useEffect from running continuosly
	}, [activityStore]);

	if (activityStore.loadingInitial) {
		return <LoadingComponent content={"Loading activities..."} />;
	}

	return (
		<Fragment>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard />
			</Container>
		</Fragment>
	);
};

export default observer(App);

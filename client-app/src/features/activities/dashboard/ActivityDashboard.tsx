import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityStore from "../../../app/store/activityStore";

const ActivityDashboard: React.FC = () => {
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
		<Grid>
			<Grid.Column width={10}>
				<ActivityList />
			</Grid.Column>
			<Grid.Column width={6}>
				<h2>Activity filters</h2>
			</Grid.Column>
		</Grid>
	);
};

export default observer(ActivityDashboard);

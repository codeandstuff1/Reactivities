import React, { Fragment } from "react";
import { NavBar } from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {

	return (
		<Fragment>
			<Route exact path="/" component={HomePage} />
			<Route
				path={"/(.+)"}
				render={() => (
					<Fragment>
						<NavBar />
						<Container style={{ marginTop: "7em" }}>
							<Route
								exact
								path="/activities"
								component={ActivityDashboard}
							/>
							<Route
								exact
								path="/activities/:id"
								component={ActivityDetails}
							/>
							{/* you need to specify key because when component's key change react will craete a new component instance */}
							<Route
								exact
								key={location.key}
								path={["/createactivity", "/manage/:id"]}
								component={ActivityForm}
							/>
						</Container>
					</Fragment>
				)} />
		</Fragment>
	);
};

export default withRouter(observer(App));

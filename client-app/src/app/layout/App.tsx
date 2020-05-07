import React, { useState, useEffect } from "react";
import { Header, Icon, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../models/activity";
import { NavBar } from "../../features/nav/NavBar";

const App = () => {
	const [activities, setActivities] = useState<IActivity[]>([]);

	//everytime component renders useEffect will be called
	useEffect(() => {
		axios.get<IActivity[]>("http://localhost:5000/api/activities").then((response) => {
			setActivities(response.data);
		});
		//need to pass second parameter as an empty array to prevent useEffect from running continuosly
	}, [])

	return (
		<div>
			<NavBar/>
			<List>
				{activities.map((activity) => (
					<List.Item key={activity.id}>{activity.title}</List.Item>
				))}
			</List>
		</div>
	);

}

export default App;

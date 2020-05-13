import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
	@observable activitiesRegistry = new Map();
	@observable loadingInitial = false;
	@observable activity: IActivity | null = null;
	@observable submitting = false;
	@observable target = "";

	@computed get activitiesByDate() {
		return Array.from(this.activitiesRegistry.values()).sort(
			(a, b) => Date.parse(a.date) - Date.parse(b.date)
		);
	}

	@action loadActivities = async () => {
		this.loadingInitial = true;
		try {
			const activities = await agent.Activities.list();
			runInAction("loading activities", () => {
				activities.forEach((activity) => {
					activity.date = activity.date.split(".")[0];
					this.activitiesRegistry.set(activity.id, activity);
					this.loadingInitial = false;
				});
			});
		} catch (error) {
			console.log(error);
			runInAction("load activities error", () => {
				this.loadingInitial = false;
			});
		}

		//*****above aproach use async method and it's just a syntactic sugar for promise****

		// agent.Activities.list()
		// 	.then((activities) => {
		// 		activities.forEach((activity) => {
		// 			activity.date = activity.date.split(".")[0];
		// 			this.activities.push(activity);
		// 		});
		// 	})
		// 	.finally(() => {
		// 		this.loadingInitial = false;
		// 	});
	};

	@action createActivity = async (activity: IActivity) => {
		this.submitting = true;
		try {
			await agent.Activities.create(activity);
			runInAction("creating activity", () => {
				this.activitiesRegistry.set(activity.id, activity);
				this.activity = activity;
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction("create activity final", () => {
				this.submitting = false;
			});
		}
	};

	@action editActivity = async (activity: IActivity) => {
		this.submitting = true;
		try {
			await agent.Activities.update(activity);
			// state modifying code (observable) should be wrapped as action. runInAction is a sugar for action wrap:
			runInAction("editing activity", () => {
				this.activitiesRegistry.set(activity.id, activity);
				this.activity = activity;
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction("edit activity final", () => {
				this.submitting = false;
			});
		}
	};

	@action deleteActivity = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Activities.delete(id);
			runInAction("deleting activity", () => {
				this.activitiesRegistry.delete(id);
			});
		} catch (error) {
			console.log(error);
		} finally {
			runInAction("delete activity final", () => {
				if (this.activity?.id === id) {
					this.activity = null;
				}
				this.submitting = false;
				this.target = "";
			});
		}
	};

	getActivity = (id: string) => {
		return this.activitiesRegistry.get(id);
	};

	@action loadActivity = async (id: string) => {
		let activity = this.getActivity(id);
		if (activity) {
			this.activity = activity;
		} else {
			try {
				this.loadingInitial = true;
				activity = await agent.Activities.details(id);
			} catch (error) {
				console.log(error);
			} finally {
				runInAction("loading activity final", () => {
					this.loadingInitial = false;
					this.activity = activity;
				});
			}
		}
	};

	@action selectActivity = (id: string) => {
		this.activity = this.activitiesRegistry.get(id);
	};

	@action clearActivity = () => {
		this.activity = null;
	}
}

export default createContext(new ActivityStore());

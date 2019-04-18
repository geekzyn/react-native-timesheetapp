const RequestBody = {
	login: (props) => {
		const params = {
			email: props.username,
			password: props.password
		};
		return { params };
	},

	timeEntry: (props) => {
		debugger;

		// id is temporary and to be removed.
		const params = {
			project_id: props.activity.project_id,
			activity_id: props.activity.id,
			description: props.description,
			start_date: "Need to be formated, in proper date formate",
			end_date: props.activityToTime,
			id: 1,
		};
		debugger;
		return {
			params
		};
	},

	activities: (props) => {
		const params = {
			project_id: props.id
		};
		return { params };
	}
};

export default RequestBody;

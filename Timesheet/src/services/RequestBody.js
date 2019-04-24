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

		const params = {
			project_id: props.activity.project_id,
			activity_id: props.activity.id,
			description: props.description,
			duration: props.duration,
			start_date: new Date(props.date).toDateString(),
			start_time: new Date(props.activityFromTime).toDateString(),
			end_time: new Date(props.activityToTime).toDateString(),
			activity: {name: props.activity.name, project: {name: props.project, customer: {name: "Temp Customer"}}},
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

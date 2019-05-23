const RequestBody = {
	login: (props) => {
		const params = {
			email: props.username,
			password: props.password
		};
		return { params };
	},

	timeEntry: (props) => {
		

		const params = {
			id: props.id,
			project_id: props.activity.project_id,
			activity_id: props.activity.id,
			description: props.description,
			duration: props.duration,
			// start_date: new Date(props.date).toDateString(),
			start_date: props.activityFromTime,
			// start_time: props.activityFromTime,
			// end_time: props.activityToTime,
			end_date: props.activityToTime,
			activity: {name: props.activity.name, project: {name: props.project, customer: {name: "Temp Customer"}}},
		};
		
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

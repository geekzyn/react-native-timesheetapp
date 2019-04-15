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
			start_date: props.activityFromTime,
			end_date: props.activityToTime
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

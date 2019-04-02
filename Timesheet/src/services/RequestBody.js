const RequestBody = {
	login: (props) => {
		const params = {
			email: props.username,
			password: props.password
		};
		return { params };
	},

	activities: (props) => {
		const prams = {
			project_id: props.selectedProjectId
		};
	}
};

export default RequestBody;

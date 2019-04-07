const RequestBody = {
	login: (props) => {
		const params = {
			email: props.username,
			password: props.password
		};
		return { params };
	},

	activities: (props) => {
		const params = {
			project_id: props.id
		};
		return { params };
	}
};

export default RequestBody;

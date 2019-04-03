import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Project extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sampleData: 0
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: 'red' }}>
				<Text style={{ alignSelf: 'center', color: 'white' }}>Project</Text>
			</View>
		);
	}
}

export default Project;

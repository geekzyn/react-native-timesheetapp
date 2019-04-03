import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TimeTracker extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sampleData: 0
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: 'orange' }}>
				<Text style={{ alignSelf: 'center', color: 'white' }}>TimeTracker</Text>
			</View>
		);
	}
}

export default TimeTracker;

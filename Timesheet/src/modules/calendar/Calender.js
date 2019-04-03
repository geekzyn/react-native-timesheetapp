import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';

class Calender extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sampleData: 0
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: '#FF8100' }}>
				<Text style={{ alignSelf: 'center', color: 'white' }}>Calender</Text>
			</View>
		);
	}
}

export default WithNavigation(Calender);
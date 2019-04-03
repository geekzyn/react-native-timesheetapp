import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sampleData: 0
		};
	}

	render() {
		return (
			<View style={{ backgroundColor: '#D65CBF' }}>
				<Text style={{ alignSelf: 'center', color: 'white' }}>Profile</Text>
			</View>
		);
	}
}

export default WithNavigation(Profile);

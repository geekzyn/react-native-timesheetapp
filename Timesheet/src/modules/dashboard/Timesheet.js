import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class Timesheet extends Component {
	constructor(props) {
		super(props);
	}

	onPress = () => {
		debugger;
		this.props.navigation.navigate('ProjectList');
	};

	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<CalendarStrip
					style={{
						height: 100,
						paddingTop: 10,
						paddingBottom: 10
					}}
					calendarHeaderStyle={{ color: 'white' }}
					calendarColor={'#187bec'}
					highlightDateNumberStyle={{ color: 'white' }}
					highlightDateNameStyle={{ color: 'white' }}
					disabledDateNameStyle={{ color: 'grey' }}
					disabledDateNumberStyle={{ color: 'grey' }}
				/>
				<FlatList
					data={[
						{
							costumerName: 'Customer 1',
							projectName: 'Project 1',
							activityName: 'Activity 1',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 2',
							projectName: 'Project 2',
							activityName: 'Activity 2',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						},
						{
							costumerName: 'Customer 3',
							projectName: 'Project 3',
							activityName: 'Activity 3',
							timestamp: '02:00-04:00',
							duration: '02:00'
						}
					]}
					renderItem={({ item }) => (
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={{ flexDirection: 'column', marginLeft: 10, marginBottom: 20 }}>
								<Text style={styles.header}>{item.costumerName}</Text>
								<Text style={styles.subtitle}>{item.projectName} </Text>
								<Text style={styles.subtitle}>{item.activityName}</Text>
								<Text style={styles.subtitle}>{item.timestamp}</Text>
							</View>
							<View
								style={{
									flexDirection: 'column',
									marginRight: 10,
									marginBottom: 20,
									alignItems: 'center'
								}}
							>
								<Text style={styles.subtitle}>{item.duration} </Text>
							</View>
						</View>
					)}
				/>

				<ActionButton
					style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 0, paddingRight: 100 }}
					buttonColor="rgba(231,76,60,1)"
					onPress={this.onPress.bind(this)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30
	},
	red: {
		color: 'red'
	},
	item: {
		color: 'red',
		fontSize: 10
	},
	header: {
		color: 'black',
		fontSize: 18
	},
	subtitle: {
		color: 'grey',
		fontSize: 16
	}
});

export default WithNavigation(Timesheet);

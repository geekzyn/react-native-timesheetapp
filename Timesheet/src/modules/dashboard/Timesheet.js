import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getTaskEntries} from './TimeSheetAction';

class Timesheet extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		debugger;
		this.props.getTaskEntries(this.props.accessToken);
	}

	componentDidUpdate() {
		debugger;
	}

	componentWillReceiveProps(nextProps) {
		nextProps.taskList;
	}

	onPress = () => {
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
				{ (this.props.serverTaskList.length > 0) ?
				<FlatList
					style={{marginTop: 10, marginBottom: 10}}
					data={this.props.serverTaskList}
					renderItem={({ item }) => (
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
							<View style={{ flexDirection: 'column', marginLeft: 10, marginBottom: 20 }}>
								<Text style={styles.header}>{item.user_id}</Text>
								<Text style={styles.subtitle}>{item.id} </Text>
								<Text style={styles.subtitle}>{item.activity_id}</Text>
								<Text style={styles.subtitle}>{item.start_date}</Text>
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
				/> : null }


				<ActionButton
					style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 0, paddingRight: 100 }}
					buttonColor="rgba(231,76,60,1)"
					onPress={this.onPress.bind(this)}
				/>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	debugger;
	const { accessToken } = state.loginReducers;
	const { serverTaskList } = state.timeSheetReducer;
	return { accessToken, serverTaskList };
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
		fontSize: 20
	},
	subtitle: {
		color: 'grey',
		fontSize: 16
	}

});

export default connect(mapStateToProps, {getTaskEntries})(WithNavigation(Timesheet));

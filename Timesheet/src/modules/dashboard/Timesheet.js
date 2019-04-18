import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, NetInfo } from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {getTaskEntries, getTaskQueueDataFromStorage} from './TimeSheetAction';
import {uploadOfflineTask} from '../entry/EntryAction';

class Timesheet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConnected: false,
			isUpdated: true,
		}
	}
//------------------- Component Class Methods -------------------//
	componentDidMount() {
		// added the event listener to know if connected.
		this.props.getTaskQueueDataFromStorage();
		this.props.getTaskEntries(this.props.accessToken);
		NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
	}

	componentDidUpdate() {
		debugger;
	}

	componentWillUnmount() {
		// remove the network event listener
		NetInfo.isConnected.removeEventListener(
			"connectionChange",
			this.handleConnectionChange
		  );
	}

	handleConnectionChange = connectionInfo => {
		console.log("connection info: ", connectionInfo);
		NetInfo.isConnected.fetch().then(isConnected => {
		  this.setState({ isConnected: isConnected });
		  const {offlineTaskQueueList} = this.props;
			if (isConnected) {
				if (
					typeof offlineTaskQueueList != 'undefined'
					|| offlineTaskQueueList !== null
					&& offlineTaskQueueList.length > 0
					)  {
						offlineTaskQueueList.forEach(item => {
							debugger;
							this.props.uploadOfflineTask(item);
							offlineTaskQueueList.shift();
						});
				}
			}
		});
	};


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
					data={this.props.newTaskList}
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
	const {offlineTaskQueueList} = state.timeEntryReducer;
	const { serverTaskList, newTaskList } = state.timeSheetReducer;
	return { accessToken, serverTaskList, newTaskList, offlineTaskQueueList };
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

export default connect(mapStateToProps, {getTaskEntries, getTaskQueueDataFromStorage, uploadOfflineTask})(WithNavigation(Timesheet));

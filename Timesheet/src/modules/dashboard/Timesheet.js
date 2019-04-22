import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, NetInfo } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { Label, Button } from 'native-base';
import {getTaskEntries, getTaskQueueDataFromStorage} from './TimeSheetAction';
import {uploadOfflineTask} from '../entry/EntryAction';
import moment from 'moment';

class Timesheet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isConnected: false,
			readyToLoad: true,
			isDateSelected: false,
			filteredTask: [],
		}
	 isOfflineDataReady = true;
	}


	//Adding Custom Navigation Headers
	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: (
				<TouchableOpacity onPress={navigation.getParam('onResetFilter')}>
					<Label style={{ fontSize: 18, marginRight: 10, color: 'black' }}>RESET FILTER</Label>
				</TouchableOpacity>
			),
			headerLeft: (
				<TouchableOpacity onPress={navigation.getParam('onCancelPressed')}>
					<Label style={{ fontSize: 18 , marginLeft: 10, color: 'black' }}>LOG OUT</Label>
				</TouchableOpacity>
			),
			headerStyle: {
				backgroundColor: '#276fea',
			  },
			};
	};
//------------------- Component Class Methods -------------------//
	componentDidMount() {
		this.props.navigation.setParams({ onResetFilter: this.onResetFilter, onCancelPressed: this.onCancelPressed });

		// added the event listener to know if connected.
		debugger;
		this.props.getTaskQueueDataFromStorage();
		this.props.getTaskEntries(this.props.accessToken);
		//set calender selection to null
		this._calender.setSelectedDate(0);
	}

	componentDidUpdate() {
		debugger;
	}

	componentWillUnmount() {
		
	}

	// handleConnectionChange = connectionInfo => {
	// 	console.log("connection info: ", connectionInfo);
	
	// };

	componentWillReceiveProps(nextProps) {
		debugger;
		if (isOfflineDataReady) {
			this.uploadOfflineData();
		}
	}

	//----------------------------------------------------//


	// Save and Cancle Action
	onResetFilter = () => {
		this._calender.setSelectedDate(0);
		this.setState({
			isDateSelected: false,
			filteredTask: []
		});
	};

	onCancelPressed = () => {
		debugger;
		this.props.navigation.pop();
	};


	uploadOfflineData() {
		debugger;
		if (this.props.offlineTaskQueueList !== null && typeof this.props.offlineTaskQueueList !== 'undefined' && this.props.offlineTaskQueueList.length > 0) 

			// NetInfo.isConnected.fetch().then(isConnected => {
			// 	debugger;
			// 	const {offlineTaskQueueList} = this.props;
			// 	  if (isConnected) {
					  {
						isOfflineDataReady = false;
						debugger;
							  this.props.offlineTaskQueueList.forEach(item => {
								  debugger;
								  this.props.uploadOfflineTask(item);
								  this.props.offlineTaskQueueList.shift();
							  });
						isOfflineDataReady = true;
					  }
				 // }
			//  });
	}


	onPress = () => {
		this.props.navigation.navigate('ProjectList');
	};

	onSelectedDate = (props) => {
		debugger;
		var date = new Date(props._d);
		var formatedDate = moment(date).format("MMM Do YY");
		// this to avoid default date.
		if (formatedDate === "Jan 1st 70")
			{ return;}

		this.filterTaskByDate(formatedDate);
	}

	filterTaskByDate = (date) => {
	 var taskList	=  this.props.newTaskList.filter((task) => {
			let taskDate = new Date(task.start_date);
			let formatedDate = moment(taskDate).format("MMM Do YY");
			return date === formatedDate;
		})
		this.setState({
			filteredTask: taskList,
			isDateSelected: true
		});
	}

	displayListOfData = () => {
		debugger;
		var list = this.state.isDateSelected > 0 ? this.state.filteredTask : this.props.newTaskList;
		return ( 
			<FlatList
					style={{marginTop: 10, marginBottom: 10}}
					data={list}
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
				/> 
		);
	}



	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<CalendarStrip
					style={{
						height: 100,
						paddingTop: 10,
						paddingBottom: 10,
						marginTop: 20,
					}}
					calendarHeaderStyle={{ color: 'white' }}
					calendarColor={'#187bec'}
					highlightDateNumberStyle={{ color: 'white' }}
					highlightDateNameStyle={{ color: 'white' }}
					disabledDateNameStyle={{ color: 'grey' }}
					disabledDateNumberStyle={{ color: 'grey' }}
					onDateSelected= {this.onSelectedDate.bind(this)}
					ref={component => this._calender = component}
					
				/>
				{ (typeof this.props.serverTaskList !== 'undefined' && this.props.serverTaskList.length > 0) ? this.displayListOfData() : null }


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

export default connect(mapStateToProps, {getTaskEntries, getTaskQueueDataFromStorage, uploadOfflineTask})(Timesheet);

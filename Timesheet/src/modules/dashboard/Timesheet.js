import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, NetInfo } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';
import { Label, Button, Footer, FooterTab, Icon } from 'native-base';
import {getTaskEntries, getTaskQueueDataFromStorage, updateFilteredList} from './TimeSheetAction';
import {uploadOfflineTask, resetTimeEntryFlag} from '../entry/EntryAction';
import moment from 'moment';

class Timesheet extends Component {
	constructor(props) {
		debugger;
		super(props);
		this.state = {
			isConnected: false,
			readyToLoad: true,
			isDateSelected: false,
		}

	 isOfflineDataReady = true;
	}

//------------------- Component Class Methods -------------------//
	componentDidMount() {
		debugger;

		// added the event listener to know if connected.
		debugger;
		this.props.getTaskQueueDataFromStorage();
		this.props.getTaskEntries(this.props.accessToken);

		//set calender selection to null
		NetInfo.isConnected.addEventListener('change', this.onConnectionChange)
	}
	
	componentWillUnmount() {
		NetInfo.removeEventListener('change', this.onConnectionChange)
	}
	
	onConnectionChange = connected =>  {
		if (connected) {
			debugger;
			this.uploadOfflineData();
		}
	}

	componentWillReceiveProps(nextProps) {
		debugger;
		if (nextProps.timeEntrySaved) {
			debugger;
			this.props.resetTimeEntryFlag();
			this.props.getTaskEntries(this.props.accessToken);
		} else if (nextProps){
			this.displayListOfData(nextProps);
		}
	}

	//----------------------------------------------------//


	// Save and Cancle Action
	onResetFilter = () => {
		this._calender.setSelectedDate(0);
	};

	onCancelPressed = () => {
		debugger;
		this.props.navigation.pop();
	};

	// Tabs at below
	reportClicked() {
		this.props.navigation.navigate('ReportScreen')
	}

	refreshList() {
		;
		this.onSelectedDate({_d: this._calender.state.selectedDate._d});
	}


	uploadOfflineData() {
		debugger;
		if (this.props.offlineTaskQueueList !== null && typeof this.props.offlineTaskQueueList !== 'undefined' && this.props.offlineTaskQueueList.length > 0) 
		{
			this.props.uploadOfflineTask(this.props.offlineTaskQueueList);
		}
	}


	onPress = () => {
		this.props.navigation.navigate('ProjectList');
	};

	onSelectedDate = (props) => {
		var date = new Date(props._d);
		var formatedDate = moment(date).format("MMM Do YY");
		// this to avoid default date.
		if (formatedDate === "Jan 1st 70" ||  typeof this.props.newTaskList === 'undefined')
			{ return;}

		this.filterTaskByDate(formatedDate);
	}

	filterTaskByDate = (date) => {
	debugger;
	 var taskList = this.props.newTaskList.filter((task) => {

			let formatedDate = moment(task.start_date).format("MMM Do YY");
			if (typeof task.start_date !== 'string') {
				task.start_date = new Date(task.start_date).toDateString();
			}
			return date === formatedDate;
		});
		// alert("TaskList: " + taskList.length)
		this.props.updateFilteredList(taskList);

	}

	displayListOfData = () => {
		debugger;
		const {newTaskList} = this.props
		if (this.state.isDateSelected === false ) {
			if (typeof newTaskList !== 'undefined' && newTaskList.length > 0) {
				let date = new Date();
				this.onSelectedDate({_d: date})
				// this._calender.setSelectedDate(date);
				this.setState({
					isDateSelected: true
				});
			}

		}

		renderSeparator = () => {
			return (
			  <View
				style={{
				  height: 1,
				  width: "86%",
				  backgroundColor: "blue",
				  marginLeft: "14%"
				}}
			  />
			);
		  };

		return ( 
			<FlatList
					style={{margin: 10, marginLeft: 20}}
					data={this.props.filterTaskList}
					ItemSeparatorComponent={this.renderSeparator}
					renderItem={({ item }) => (
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
							<View style={{ flexDirection: 'column', marginLeft: 10, marginBottom: 20 }}>
								<Text style={styles.header}>{item.activity.project.customer.name}</Text>
								<Text style={styles.subtitle}>{item.activity.project.name} </Text>
								<Text style={styles.subtitle}>{item.activity.name}</Text>
								<Text style={[styles.subtitle, {color: 'green'}]}>{item.start_date}</Text>
							</View>
							<View
								style={{
									flexDirection: 'column',
									marginRight: 10,
									marginBottom: 20,
									alignItems: 'center'
								}}
							>
								<Text style={[styles.subtitle, {color: 'orange'}]}>{item.duration} </Text>
							</View>
						</View>
					)}
				/> 
		);
	}

	//This is for footter tab in React  
	footterTabs() {
		return (
			<Footer>
				<FooterTab>
					<Button style={{backgroundColor: "#0051FF"}}  vertical onPress={this.reportClicked.bind(this)}>
						<Icon name="clipboard" />
						<Text>Report</Text>
					</Button>
					<Button  style={{backgroundColor: "#0051FF"}}  vertical onPress={this.refreshList.bind(this)}>
						<Icon name="refresh" />
						<Text>Refresh</Text>
					</Button>
				</FooterTab>
		  </Footer>

		)
	}


	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
			
				<CalendarStrip
					style={{
						height: 100,
						paddingTop: 10,
						paddingBottom: 10,
					}}
					calendarHeaderStyle={{ color: 'white' }}
					calendarColor={'#0051FF'}
					highlightDateNumberStyle={{ color: 'white' }}
					highlightDateNameStyle={{ color: 'white' }}
					disabledDateNameStyle={{ color: 'grey' }}
					disabledDateNumberStyle={{ color: 'grey' }}
					onDateSelected= {this.onSelectedDate.bind(this)}
					ref={component => this._calender = component}
					
				/>
				{this.displayListOfData()}
				{this.footterTabs()}

				<ActionButton
					style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 50, paddingRight: 100 }}
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
	const {offlineTaskQueueList, timeEntrySaved } = state.timeEntryReducer;
	const { serverTaskList, newTaskList, filterTaskList } = state.timeSheetReducer;
	return { accessToken, serverTaskList, newTaskList, filterTaskList, offlineTaskQueueList, timeEntrySaved};
}

const styles = StyleSheet.create({
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 32
	},
	red: {
		color: 'red'
	},
	item: {
		color: 'red',
		fontSize: 10
	},
	header: {
		color: 'blue',
		fontSize: 30
	},
	subtitle: {
		color: 'black',
		fontSize: 24
	}

});

export default connect(mapStateToProps, {
	getTaskEntries,
	getTaskQueueDataFromStorage,
	uploadOfflineTask,
	updateFilteredList,
	resetTimeEntryFlag
})(Timesheet);

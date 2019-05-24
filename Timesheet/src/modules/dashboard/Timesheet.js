import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, NetInfo, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import ActionButton from 'react-native-action-button';
import {connect} from 'react-redux';
import { Label, Button, Footer, FooterTab, Icon } from 'native-base';
import {getTaskEntries, getTaskQueueDataFromStorage, updateFilteredList, deleteTask} from './TimeSheetAction';
import {uploadOfflineTask, resetTimeEntryFlag} from '../entry/EntryAction';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';

class FlatlistItem extends Component {

	
    constructor(props) {
        super(props);     
        this.state = ({
			activeRowKey: null,

        });
		}
		
		onItemPress(item) {
			
			this.props.navigation.navigate('EditScreen', {item});
		}
   
    render() {
		const swipeSettings = {
			autoClose: true,
			onClose: (secId, rowId, direction) => {
				if(this.state.activeRowKey != null) {
					this.setState({ activeRowKey: null });
				}              
			},          
			onOpen: (secId, rowId, direction) => {
				this.setState({ activeRowKey: this.props.item.id });
			},      
			right: [
				{ 
					onPress: () => {    
						const deletingRow = this.state.activeRowKey;          
						Alert.alert(
							'Alert',
							'Are you sure you want to delete ?',
							[                              
							  {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
							  {text: 'Yes', onPress: () => {   
									
									this.props.parentFlatList.props.deleteTask(this.props.item.id, this.props.parentFlatList.props.accessToken);
									this.props.dataList.splice(this.props.index, 1); 
								// //Refresh FlatList ! 
									this.props.parentFlatList.refreshFlatList(deletingRow);
									this.props.parentFlatList.props.newTaskList.splice(this.props.index, 1);
							  }},
							],
							{ cancelable: true }
						  ); 
					}, 
					text: 'Delete', type: 'delete' 
				}
			],  
			rowId: this.props.index, 
			sectionId: 1    
		}
		console.log(this.props.item.start_date);
			const {start_date, end_date} = this.props.item;

			if (typeof start_date === 'undefined') {
				start_date = new Date();
			} else if (typeof end_date === 'undefined') {
				end_date = new Date();
			}
			
			let startTime = new Date(start_date.replace(' ', 'T')).toLocaleTimeString();
			let endTime = new Date(end_date.replace(' ', 'T')).toLocaleTimeString();
			
      return (
        <Swipeout {...swipeSettings} style={{backgroundColor: 'white'}}>
						<TouchableOpacity onPress={this.onItemPress.bind(this, this.props.item)}>

						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
							<View style={{ flexDirection: 'column', marginLeft: 10, marginBottom: 20 }}>
								<Text style={styles.header}>{this.props.item.activity.project.customer.name}</Text>
								<Text style={styles.subtitle}>{this.props.item.activity.project.name} </Text>
								<Text style={styles.subtitle}>{this.props.item.activity.name}</Text>
								<Text style={[styles.subtitle, {color: 'green'}]}>{startTime +" - "+ endTime}</Text>
							</View>
							<View
								style={{
									flexDirection: 'column',
									marginRight: 10,
									marginBottom: 20,
									alignItems: 'center'
								}}
							>
								<Text style={[styles.subtitle, {color: 'orange'}]}>{this.props.item.duration} </Text>
							</View>
						</View>
						</TouchableOpacity>

					</Swipeout>      
		);
    }
}

class Timesheet extends Component {
	constructor(props) {
		
		super(props);
		this.state = {
			isConnected: false,
			readyToLoad: true,
			isDateSelected: false,
			deletedRowKey: null,            
		}

	 isOfflineDataReady = true;
	}

	refreshFlatList = (deletedKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: deletedKey
            };
        });
    }

//------------------- Component Class Methods -------------------//
	componentDidMount() {
		

		// added the event listener to know if connected.
		
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
			
			this.uploadOfflineData();
		}
	}

	componentWillReceiveProps(nextProps) {
		
		if (nextProps.timeEntrySaved) {
			
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
		
		this.props.navigation.pop();
	};

	// Tabs at below
	reportClicked() {
		this.props.navigation.navigate('ReportScreen')
	}

	refreshList() {
		this.onSelectedDate({_d: this._calender.state.selectedDate._d});
	}


	uploadOfflineData() {
		
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
	
	 var taskList = this.props.newTaskList.filter((task) => {

			let formatedDate = moment(task.start_date).format("MMM Do YY");
			if (typeof task.start_date !== 'string') {
				task.start_date = new Date(task.start_date).toDateString();
			}
			return date === formatedDate;
		});
		this.props.updateFilteredList(taskList);

	}

	displayListOfData = () => {
		
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
			}

			
		

		return ( 
			<FlatList
					style={{margin: 10, marginLeft: 10}}
					data={this.props.filterTaskList}
					ItemSeparatorComponent={this.renderSeparator}
					renderItem={({ item, index }) => (
								<FlatlistItem item={item} index={index} parentFlatList={this} dataList={this.props.filterTaskList} navigation={this.props.navigation}>
								</FlatlistItem>
						
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
			<View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white" }}>
			
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
					buttonColor="#FF3636"
					onPress={this.onPress.bind(this)}
				/>

				
			</View>
		);
	}
}

//------------------------------ FLATLIST ITEM ----------------------------//


const mapStateToProps = (state) => {
	
	const { accessToken } = state.loginReducers;
	const {offlineTaskQueueList, timeEntrySaved } = state.timeEntryReducer;
	const { serverTaskList, newTaskList, filterTaskList } = state.timeSheetReducer;
	return { accessToken, serverTaskList, newTaskList, filterTaskList, offlineTaskQueueList, timeEntrySaved};
}

const styles = StyleSheet.create({
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 20
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
		fontSize: 18
	},
	subtitle: {
		color: 'black',
		fontSize: 16
	}
	

});

export default connect(mapStateToProps, {
	getTaskEntries,
	getTaskQueueDataFromStorage,
	uploadOfflineTask,
	updateFilteredList,
	resetTimeEntryFlag,
	deleteTask,
})(Timesheet);

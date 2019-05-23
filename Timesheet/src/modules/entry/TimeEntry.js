import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { CellInput, CellGroup, CellDatePicker, CellSlider, CellSwitch, Cell } from 'react-native-cell-components';
import Moment from 'moment';
import { Label, Button } from 'native-base';
import Utils from '../../utils/Utils';
import { saveTimeEntry } from '../entry/EntryAction';
import { connect } from 'react-redux';


class TimeEntry extends React.Component {
	constructor(props) {
		super(props);
		
		const { activity, project } = this.props.navigation.state.params;
		this.state = {
			activityFromTime: new Date(),
			activityToTime: new Date(),
			activity,
			project,
			duration: 0,
			startDate: new Date(),
			endDate: new Date(),
			description: '',
		};
	}

	//Adding Custom Navigation Headers
	static navigationOptions = ({ navigation }) => {
		return {
			headerRight: (
				<TouchableOpacity onPress={navigation.getParam('onSaveData')}>
					<Label style={{ fontWeight: 'bold', marginRight: 10, color: 'green' }}>SAVE</Label>
				</TouchableOpacity>
			),
			headerLeft: (
				<TouchableOpacity onPress={navigation.getParam('onCancelPressed')}>
					<Label style={{ fontWeight: 'bold', marginLeft: 10, color: 'red' }}>CANCEL</Label>
				</TouchableOpacity>
			)
		};
	};

	componentDidMount() {
		this.props.navigation.setParams({ onSaveData: this.onSaveData, onCancelPressed: this.onCancelPressed });
	}

	handleOnStartDateSelected = (date) => {
		

		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		// var value = this.stat

		var newStartTime = this.state.activityFromTime;
		newStartTime.setDate(day);
		newStartTime.setMonth(month);
		newStartTime.setFullYear(year);

		this.setState({
			startDate: date,
			activityFromTime: newStartTime
		});
	};

	handleOnEndDateSelected = (date) => {

		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		// var value = this.stat

		var newEndTime = this.state.activityToTime;
		newEndTime.setDate(day);
		newEndTime.setMonth(month);
		newEndTime.setFullYear(year);
		
		this.setState({
			endDate: date,
			activityToTime: newEndTime
		});
	};

	handleOnTimeSelected = () => {
		this.setState({
			duration: ((this.state.activityToTime - this.state.activityFromTime) / (1000 * 60 * 60)) % 24
		});
	};

	// Navigation on project and activity click
	onProjectClicked = () => {
		this.props.navigation.navigate('ProjectList');
	};

	onActivityClicked = () => {
		this.props.navigation.pop();
	};

	// Save and Cancle Action
	onSaveData = () => {
		if (this.validateEntries() === false) {
			Alert.alert('ALERT', 'Please fill the details.');
			return;
		}
		
		this.props.saveTimeEntry({ state: this.state, navigation: this.props.navigation });
	};

	onCancelPressed = () => {
		
		this.props.navigation.pop();
	};

	validateEntries() {
		var { activityFromTime, activityToTime, description, project } = this.state;

		if (Utils.isEmptyOrNull(description)) {
			return false;
		}
		return true;
	}

	// UI
	render() {
		return (
			<View style={styles.container}>
				<Label style={{fontSize: 32, color: 'black', alignSelf: "center"}}>CREATE NEW ENTRY</Label>

				<View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#eee', paddingLeft: 10, paddingRight: 10 }}>
					<ScrollView>
						<Label style={{fontSize: 30, color: 'black', marginTop: 20}}>{"ENTRY DETAILS: "}</Label>
						<CellGroup>
							<Cell>
								<TouchableOpacity onPress={this.onProjectClicked.bind(this)}>
									<Label style={{color: 'black', fontSize: 20}}>PROJECT</Label>
									<Label style={{color: '#033C8B', fontSize: 18}}>{this.state.project}</Label>
								</TouchableOpacity>
							</Cell>
							<Cell>
								<TouchableOpacity onPress={this.onActivityClicked.bind(this)}>
									<Label style={{color: 'black', fontSize: 20}}>ACTIVITY</Label>
									<Label style={{color: '#033C8B', fontSize: 18}}>{this.state.activity.name}</Label>
								</TouchableOpacity>
							</Cell>
							<CellInput
								style={{fontSize: 18, color: 'black'}}
								title="NOTES"
								onChangeText={(description) => this.setState({ description })}
								multiline
								autoResize
								rows={4}
							/>
						</CellGroup>
						<Label style={{fontSize: 30, color: 'black', marginTop: 20}}>{"ENTRY TIMING: "}</Label>
						<CellGroup>
							<CellDatePicker
								icon="date-range"
								title="Start Date"
								mode="date"
								date={this.state.startDate}
								value={Moment(this.state.startDate).format('L')}
								onDateSelected={this.handleOnStartDateSelected}
							/>
							<CellDatePicker
								icon="date-range"
								title="End Date"
								mode="date"
								date={this.state.endDate}
								value={Moment(this.state.endDate).format('L')}
								onDateSelected={this.handleOnEndDateSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="Start of day"
								mode="time"
								date={this.state.activityFromTime}
								value={Moment(this.state.activityFromTime).format('LT')}
								onDateSelected={this.handleOnTimeSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="End of day"
								mode="time"
								date={this.state.activityToTime}
								value={Moment(this.state.activityToTime).format('LT')}
								onDateSelected={this.handleOnTimeSelected}
								style={{fontSize: 30}}
							/>
							<Cell title="DURATION" icon="update">
								<Text>{this.state.duration}</Text>
							</Cell>
						</CellGroup>
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

export default connect(null, { saveTimeEntry })(TimeEntry);

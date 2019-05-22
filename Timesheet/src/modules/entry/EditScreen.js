import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { CellInput, CellGroup, CellDatePicker, CellSlider, CellSwitch, Cell } from 'react-native-cell-components';
import Moment from 'moment';
import { Label, Button } from 'native-base';
import Utils from '../../utils/Utils';
import {  editTask } from './EntryAction';
import { connect } from 'react-redux';
import TimeEntry from './TimeEntry';


class EditScreen extends React.Component {
	constructor(props) {
		super(props);
		debugger;
		const { item } = this.props.navigation.state.params;
		this.state = {
			activityFromTime: new Date(),
			activityToTime: new Date(),
			activity: item.activity,
			project: item.activity.project,
			duration: item.duration,
			startDate: new Date(item.start_date),
			endDate: new Date(item.end_date),
			description: item.description,
			id: item.id,
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
		this.setState({
			startDate: date
		});
	};

	handleOnEndDateSelected = (date) => {
		this.setState({
			endDate: date
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
			Alert.alert('TRACKER ALERT', 'Please fill the details.');
			return;
		}
		
		this.props.editTask({ state: this.state, navigation: this.props.navigation, activityId: this.state.id  });
	};

	onCancelPressed = () => {
		
		this.props.navigation.pop();
	};

	validateEntries() {
		var { activityFromTime, activityToTime, description } = this.state;

		if (Utils.isEmptyOrNull(description)) {
			return false;
		}
		return true;
	}

	// UI
	render() {
		return (
			<View style={styles.container}>
				<Label style={{fontSize: 32, color: 'white', alignSelf: "center"}}>EDIT THE TASK</Label>
				<View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#eee', paddingLeft: 10, paddingRight: 10 }}>
					<ScrollView>
						<Label style={{fontSize: 30, color: 'white', marginTop: 20}}>{"TASK DETAILS: "}</Label>
						<CellGroup>
							<Cell>
								<TouchableOpacity onPress={this.onProjectClicked.bind(this)}>
									<Label style={{color: 'black', fontSize: 20}}>PROJECT</Label>
									<Label style={{color: '#033C8B', fontSize: 18}}>{this.state.project.name}</Label>
								</TouchableOpacity>
							</Cell>
							<Cell>
								<TouchableOpacity onPress={this.onActivityClicked.bind(this)}>
									<Label style={{color: 'black', fontSize: 20}}>ACTIVITY</Label>
									<Label style={{color: '#033C8B', fontSize: 18}}>{this.state.activity.name}</Label>
								</TouchableOpacity>
							</Cell>
							<Cell>
								<Label style={{color: 'black', fontSize: 20}}>{"Notes: Description"}</Label>
							</Cell>
							<CellInput
								style={{fontSize: 18, color: '#033C8B'}}
								title="NOTES"
								value={this.state.description}
								onChangeText={(description) => this.setState({ description })}
								multiline
								autoResize
								rows={4}
							/>
						</CellGroup>
						<Label style={{fontSize: 30, color: 'white', marginTop: 20}}>{"TASK TIMING: "}</Label>
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
		backgroundColor: '#03264F'
	}
});

export default connect(null, { editTask })(EditScreen);
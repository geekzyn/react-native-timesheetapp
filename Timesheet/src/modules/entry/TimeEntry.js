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
		debugger;
		const { activity, project } = this.props.navigation.state.params;
		this.state = {
			activityFromTime: new Date(),
			activityToTime: new Date(),
			activity,
			project,
			duration: 0,
			date: new Date(),
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

	handleOnDateSelected = (date) => {
		this.setState({
			date: date
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
		debugger;
		this.props.saveTimeEntry({ state: this.state, navigation: this.props.navigation });
	};

	onCancelPressed = () => {
		debugger;
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
				<View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#eee' }}>
					<ScrollView>
						<CellGroup>
							<Cell>
								<TouchableOpacity onPress={this.onProjectClicked.bind(this)}>
									<Label>PROJECT</Label>
									<Label>{this.state.project}</Label>
								</TouchableOpacity>
							</Cell>
							<Cell>
								<TouchableOpacity onPress={this.onActivityClicked.bind(this)}>
									<Label>ACTIVITY</Label>
									<Label>{this.state.activity.name}</Label>
								</TouchableOpacity>
							</Cell>
							<CellInput
								title="NOTES"
								onChangeText={(description) => this.setState({ description })}
								multiline
								autoResize
								rows={4}
							/>
						</CellGroup>
						<CellGroup>
							<CellDatePicker
								icon="date-range"
								title="DATE"
								mode="date"
								date={this.state.date}
								value={Moment(this.state.date).format('L')}
								onDateSelected={this.handleOnDateSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="FROM"
								mode="time"
								date={this.state.activityFromTime}
								value={Moment(this.state.activityFromTime).format('LT')}
								onDateSelected={this.handleOnTimeSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="TO"
								mode="time"
								date={this.state.activityToTime}
								value={Moment(this.state.activityToTime).format('LT')}
								onDateSelected={this.handleOnTimeSelected}
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
		backgroundColor: '#f3f3f3'
	}
});

export default connect(null, { saveTimeEntry })(TimeEntry);

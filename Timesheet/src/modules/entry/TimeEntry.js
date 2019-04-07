import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CellInput, CellGroup, CellDatePicker, CellSlider, CellSwitch, Cell } from 'react-native-cell-components';
import Moment from 'moment';
import { Label } from 'native-base';
import SelectList from 'react-native-cell-components/components/SelectList';

class TimeEntry extends React.Component {
	constructor(props) {
		super(props);
		debugger;
		const { activity, project } = this.props.navigation.state.params;
		this.state = {
			activityFromTime: new Date(),
			activityToTime: new Date(),
			activity,
			project
		};
	}

	handleOnDateSelected = (date) => {
		this.setState({
			date
		});
	};

	onProjectClicked = () => {
		this.props.navigation.replace('ProjectList');
	};

	onActivityClicked = () => {
		this.props.navigation.pop();
	};

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
							<CellInput title="NOTES" multiline autoResize rows={4} />
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
								onDateSelected={this.handleOnDateSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="TO"
								mode="time"
								date={this.state.activityToTime}
								value={Moment(this.state.activityToTime).format('LT')}
								onDateSelected={this.handleOnDateSelected}
							/>
							<Cell title="DURATION" icon="update">
								<Text>02:00</Text>
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

export default TimeEntry;

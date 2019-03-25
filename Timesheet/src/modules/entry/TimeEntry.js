import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CellInput, CellGroup, CellDatePicker, CellSlider, CellSwitch, Cell } from 'react-native-cell-components';
import Moment from 'moment';
import { Label } from 'native-base';

class TimeEntry extends React.Component {
	constructor() {
		super();
		this.state = {
			date: new Date()
		};
	}

	handleOnDateSelected = (date) => {
		this.setState({
			date
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#eee' }}>
					<ScrollView>
						<CellGroup>
							<Cell>
								<TouchableOpacity>
									<Label>PROJECT</Label>
									<Label>Project #1</Label>
								</TouchableOpacity>
							</Cell>
							<Cell>
								<TouchableOpacity>
									<Label>ACTIVITY</Label>
									<Label>Activity #1</Label>
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
								date={this.state.date}
								value={Moment(this.state.date).format('LT')}
								onDateSelected={this.handleOnDateSelected}
							/>
							<CellDatePicker
								icon="access-time"
								title="TO"
								mode="time"
								date={this.state.date}
								value={Moment(this.state.date).format('LT')}
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

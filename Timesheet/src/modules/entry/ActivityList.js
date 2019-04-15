import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Button, Title, Label } from 'native-base';

class ActivityList extends Component {
	constructor(props) {
		super(props);
		debugger;
		const { activityData, project } = this.props.navigation.state.params;
		this.state = {
			activityData,
			project
		};
		console.log(this.props.navigation);
	}

	// componentWillReceiveProps(props) {
	// 	debugger;
	// }

	componentWillUpdate(props) {
		debugger;
		// const { activityData, project } = this.props.navigation.state.params;
		// this.setState({
		// 	activityData,
		// 	project
		// });
	}

	componentDidMount() {
		debugger;
		const { activityData, project } = this.props.navigation.state.params;
		this.setState({
			activityData,
			project
		});
	}

	// componentWillMount() {
	// 	debugger;
	// }

	componentDidMount() {}

	onActivityClicked = (props) => {
		debugger;
		this.props.navigation.navigate('TimeEntry', props);
	};

	renderSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: '#CED0CE',
					marginLeft: '0%'
				}}
			/>
		);
	};

	render() {
		return (
			<Container style={{ backgroundColor: '#f3f3f3' }}>
				<Header searchBar rounded>
					<Item>
						<Icon name="ios-search" />
						<Input placeholder="Search" />
						<Icon name="ios-people" />
					</Item>

					<Button transparent>
						<Text>Search Task</Text>
					</Button>
				</Header>
				<FlatList
					ItemSeparatorComponent={this.renderSeparator}
					data={this.state.activityData}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={this.onActivityClicked.bind(this, {
									activity: item,
									project: this.state.project
								})}
							>
								<Label>{item.name}</Label>
							</TouchableOpacity>
						);
					}}
				/>
			</Container>
		);
	}
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
		padding: 5,
		height: 80,
		color: 'black',
		fontSize: 16,
		fontWeight: 'bold'
	},
	subtitle: {
		color: 'grey',
		fontSize: 16
	}
});

export default ActivityList;

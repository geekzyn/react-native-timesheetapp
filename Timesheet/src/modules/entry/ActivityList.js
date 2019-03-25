import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Button, Title } from 'native-base';

class ActivityList extends Component {
	constructor(props) {
		super(props);
	}

	onProjectClicked = () => {
		this.props.navigation.navigate('TimeEntry');
	};

	render() {
		return (
			<Container style={{ backgroundColor: '	#fffefc' }}>
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
					data={[
						{ activity: 'Task1' },
						{ activity: 'Task2' },
						{ activity: 'Task3' },
						{ activity: 'Task4' },
						{ activity: 'Task5' },
						{ activity: 'Task6' },
						{ activity: 'Task7' },
						{ activity: 'Task8' }
					]}
					renderItem={({ item }) => {
						debugger;
						return (
							<TouchableOpacity style={{ flex: 1 }} onPress={this.onProjectClicked}>
								<Text style={styles.header}>{item.activity}</Text>
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
		padding: 20,
		height: 80,
		color: 'black',
		fontSize: 24,
		fontWeight: 'bold'
	},
	subtitle: {
		color: 'grey',
		fontSize: 16
	}
});

export default ActivityList;

import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Button, Title, Label } from 'native-base';

class ActivityList extends Component {
	constructor(props) {
		super(props);
	}

	onProjectClicked = () => {
		this.props.navigation.navigate('TimeEntry');
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
						return (
							<TouchableOpacity onPress={this.onProjectClicked}>
								<Label>{item.activity}</Label>
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

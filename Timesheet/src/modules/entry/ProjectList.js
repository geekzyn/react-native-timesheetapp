import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Input, Icon, Item, Button, Title, Label } from 'native-base';

class ProjectList extends Component {
	constructor(props) {
		super(props);
	}

	onProjectClicked = () => {
		this.props.navigation.navigate('ActivityList');
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
				<SectionList
					ItemSeparatorComponent={this.renderSeparator}
					sections={[
						{ title: 'Customer 1', data: [ 'Project 1', 'Project 2' ] },
						{ title: 'Customer 2', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 3', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 4', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 5', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 6', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 7', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 8', data: [ 'Project 3', 'Project 4' ] },
						{ title: 'Customer 9', data: [ 'Project 3', 'Project 4' ] }
					]}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity onPress={this.onProjectClicked}>
								<Text style={styles.SectionListItemStyle}>{item}</Text>
							</TouchableOpacity>
						);
					}}
					renderSectionHeader={({ section }) => {
						return (
							<View>
								<Text style={styles.SectionHeaderStyle}>{section.title}</Text>
							</View>
						);
					}}
				/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	SectionHeaderStyle: {
		backgroundColor: '#CCCCCC',
		fontSize: 15,
		padding: 5,
		color: 'black',
		fontWeight: 'bold'
	},
	SectionListItemStyle: {
		fontSize: 15,
		padding: 15,
		color: '#000',
		backgroundColor: '#F5F5F5'
	}
});

export default ProjectList;

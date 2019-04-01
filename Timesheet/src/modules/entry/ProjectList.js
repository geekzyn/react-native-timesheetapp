import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Input, Icon, Item, Button, Title, Label } from 'native-base';
import { GetProjectAPI, GetCustomerAPI } from '../../services/APIConfig';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { callAPI } from '../../services/RequestBuilder';

class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerData: [],
			projectData: [],
			processedData: []
		};
	}

	componentDidMount() {
		this.fetchCustomerData();
	}

	fetchCustomerData() {
		const header = INITIAL_HEADERS;
		callAPI(GetCustomerAPI, {}, {}, header)
			.then((response) => {
				this.setState({
					isLoading: false,
					customerData: response.data
				});
				this.fetchProjectData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchProjectData() {
		const header = INITIAL_HEADERS;
		callAPI(GetProjectAPI, {}, {}, header)
			.then((response) => {
				this.setState({
					isLoading: false,
					projectData: response.data
				});
				this.processDisplayData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	processDisplayData() {
		let tempData = [];
		this.state.customerData.forEach((customerRecord) => {
			let projectList = [];
			this.state.projectData.filter((project) => {
				if (customerRecord.id === project.customer_id) {
					projectList.push(project.name);
				}
			});
			tempData.push({ title: customerRecord.name, data: projectList });
		});
		this.setState({ processedData: tempData });
	}

	// Alert message
	showAlert(message) {
		Alert.alert(
			'TRACKER ALERT',
			message,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => console.log('OK Pressed') }
			],
			{ cancelable: true }
		);
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
					//{ title: 'Customer 1', data: [ 'Project 1', 'Project 2' ]
					sections={this.state.processedData}
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

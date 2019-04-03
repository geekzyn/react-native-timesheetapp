import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Input, Icon, Item, Button, Title, Label } from 'native-base';
import { GetProjectAPI, GetCustomerAPI, GetActivitiesAPI } from '../../services/APIConfig';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { callAPI } from '../../services/RequestBuilder';
import RequestBody from '../../services/RequestBody';

class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerData: [],
			projectData: [],
			processedData: [],
			activityData: [],
			selectedProjectId: 0
		};
	}

	componentDidMount() {
		this.fetchCustomerData();
	}

	fetchCustomerData() {
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(GetCustomerAPI, {}, {}, header)
			.then((response) => {
				this.setState({
					isLoading: false,
					customerData: response.data
				});
				debugger;
				this.fetchProjectData();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	fetchProjectData() {
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(GetProjectAPI, {}, {}, header)
			.then((response) => {
				this.setState({
					isLoading: false,
					projectData: response.data
				});
				debugger;
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
					projectList.push({ name: project.name, id: project.id });
				}
			});
			tempData.push({ title: customerRecord.name, data: projectList });
		});
		debugger;
		this.setState({ processedData: tempData });
	}

	activitiesCallAPI() {
		const { params, query } = RequestBody.activities(this.state);
		const header = INITIAL_HEADERS;
		debugger;
		callAPI(GetActivitiesAPI, params, query, header)
			.then((response) => {
				this.setState({
					isLoading: false,
					activityData: response.data
				});
				this.props.navigation.navigate('ActivityList', this.state.activityData);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//Alert message
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

	onProjectClicked = (props) => {
		debugger;
		this.props.navigation.navigate('ActivityList', [
			{ activity: 'Task1' },
			{ activity: 'Task2' },
			{ activity: 'Task3' }
		]);
		this.setState({ selectedProjectId: props });
		this.activitiesCallAPI();
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
					//{ title: 'Customer 1', data: [ {name:'Project 1', id: "id"}, {name:'Project 1', id: "id"}]
					sections={this.state.processedData}
					renderItem={({ item }) => {
						this.setState;
						return (
							<TouchableOpacity onPress={this.onProjectClicked.bind(this, item.id)}>
								<Text style={styles.SectionListItemStyle}>{item.name}</Text>
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

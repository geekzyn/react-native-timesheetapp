import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';
import { Container, Header, Input, Icon, Item, Button, Title, Label } from 'native-base';
import { GetActivitiesAPI } from '../../services/APIConfig';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import { callAPI } from '../../services/RequestBuilder';
import RequestBody from '../../services/RequestBody';
import { connect } from 'react-redux';
import {
	fetchProjectData, 
	fetchCustomerData, 
	fetchActivities,
	saveSelectedProject,
} from './EntryAction';
import AppStorage from '../../utils/AppAsyncStorage';

class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customerData: [],
			projectData: [],
			processedData: [],
			activityData: [],
			selectedProjectId: null
		};
		debugger;
	}

	componentDidMount() {
		debugger;
		if (this.props.customerList == null || this.props.customerList.length == 0) {
			this.props.fetchCustomerData(this.props.accessToken);
		}
	}

	componentWillReceiveProps(nextProps){
		debugger;
		if (typeof nextProps.customerList !== 'undefined' && nextProps.customerList !== null &&
		nextProps.customerList.length > 0 && this.props.projectList.length == 0) {
			debugger;
			this.props.fetchProjectData(this.props.accessToken);
		} else if (this.props.projectList.length > 0 && this.state.processedData.length == 0) {
			this.processDisplayData();
		}
	}

	processDisplayData() {
		let tempData = [];
		const {customerList, projectList} = this.props;
			customerList.forEach((customerRecord) => {
			let tempProjectList = [];
			projectList.filter((project) => {
				if (customerRecord.id === project.customer_id) {
					tempProjectList.push({ name: project.name, id: project.id });
				}
			});
			tempData.push({ title: customerRecord.name, data: projectList });
		});
		this.setState({ processedData: tempData });
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

	onProjectClicked = (selectedProject) => {
		this.setState({ selectedProjectId: selectedProject.id });
		this.props.saveSelectedProject(selectedProject.name);
		this.props.fetchActivities({selectedProject, props: this.props});
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
							<TouchableOpacity onPress={this.onProjectClicked.bind(this, item)}>
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

const mapStateToProps = (state) => {
	debugger;
	const { accessToken } = state.loginReducers;
	const {projectList, customerList} = state.timeEntryReducer;
	return { accessToken, projectList, customerList };
};

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

export default connect(mapStateToProps, {
	fetchProjectData, 
	fetchCustomerData, 
	fetchActivities,
	saveSelectedProject,
})(ProjectList);

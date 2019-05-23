import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SectionList } from 'react-native';
import { Container, Header, Input, Icon, Item, Button, Title, Label, Spinner } from 'native-base';
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
			selectedProjectId: null,
		};
		
	}

	componentDidMount() {
		
		const {customerList, projectList } = this.props;
		if (this.props.customerList == null || this.props.customerList.length == 0) {
			this.props.fetchCustomerData(this.props);
			this.props.fetchProjectData(this.props);
		} else {
			this.processDisplayData(projectList, customerList);
		}
	}

	componentWillReceiveProps(nextProps){
		
		// Handling the undefined in offline mode
		let {projectList = [], customerList = [] } = nextProps;
		
		//Handling null in offline mode
		if (projectList === null )
		{
			projectList = [];
		}
		if (customerList === null) {
			customerList = [];
		}
		 if ((projectList.length > 0 && customerList.length > 0) && this.state.processedData.length == 0) {
			
			this.processDisplayData(projectList, customerList);
		}
	}

	processDisplayData(projectList, customerList) {
		let tempData = [];
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
			'ALERT',
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

	manageListUI() {
		if (this.state.processedData.length > 0) {
			return (
				this.showListOfData()
			)
		} else {
			return (
				<Spinner color='red'/>
			)
		}
		
	}

	showListOfData() {
		return (
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
		)
	}

	render() {
		return (
			<Container style={{ backgroundColor: '#f3f3f3' }}>
				{this.manageListUI()}
				
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	
	const { accessToken } = state.loginReducers;
	const {projectList, customerList} = state.timeEntryReducer;
	return { accessToken, projectList, customerList };
};

const styles = StyleSheet.create({
	SectionHeaderStyle: {
		backgroundColor: '#CCCCCC',
		fontSize: 25,
		padding: 5,
		color: 'black',
		fontWeight: 'bold'
	},
	SectionListItemStyle: {
		fontSize: 20,
		padding: 15,
		color: 'black',
		backgroundColor: '#338DFF'
	}
});

export default connect(mapStateToProps, {
	fetchProjectData, 
	fetchCustomerData, 
	fetchActivities,
	saveSelectedProject,
})(ProjectList);

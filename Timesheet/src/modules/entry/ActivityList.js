import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Container, Header, Item, Input, Icon, Button, Title, Label } from 'native-base';
import {connect} from 'react-redux';

class ActivityList extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const {selectedProject} = this.props;
		
	}

	// componentWillMount() {
	// 	
	// }

	componentDidMount() {}

	onActivityClicked = (props) => {
		
		this.props.navigation.navigate('TimeEntry', props);
	};

	renderSeparator = () => {
		return (
			<View style={{ height: 2, width: '100%', backgroundColor: 'white', marginLeft: '0%' }} />
		);
	};

	render() {
		return (
			<Container style={{ backgroundColor: '#f3f3f3' }}>
				<FlatList
					ItemSeparatorComponent={this.renderSeparator}
					data={this.props.activityList}
					renderItem={({ item }) => {
						
						return (
							<TouchableOpacity
								onPress={this.onActivityClicked.bind(this, {
									activity: item,
									project: this.props.selectedProject
								})}
								style={{backgroundColor: '#338DFF'}}
							>
								<Label style={{margin: 20, fontSize: 25}}>{item.name}</Label>
							</TouchableOpacity>
						);
					}}
				/>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	
	const { activityList, selectedProject  } = state.timeEntryReducer;
	return { activityList, selectedProject };
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

export default connect(mapStateToProps, {})(ActivityList);

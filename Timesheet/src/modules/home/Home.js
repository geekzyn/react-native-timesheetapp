import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { callAPI } from '../../services/RequestBuilder';
import { SampleAPI } from '../../services/APIConfig';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			moviesArray: null
		};
	}

	webServiceCall = () => {
		this.setState({
			isLoading: true
		});

		callAPI(SampleAPI, {})
			.then((response) => {
				this.setState({
					isLoading: false,
					moviesArray: response.movies
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	showData = () => {
		if (this.state.moviesArray === null) {
			return null;
		}
		return (
			<View style={{ flex: 1, paddingTop: 20 }}>
				<FlatList
					data={this.state.moviesArray}
					renderItem={({ item }) => (
						<Text>
							{item.title}, {item.releaseYear}
						</Text>
					)}
					keyExtractor={({ id }, index) => id}
				/>
			</View>
		);
	};

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, padding: 20 }}>
					<ActivityIndicator />
				</View>
			);
		}
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#D499D4' }}>
				<Text> Home Screen </Text>
				{this.showData()}
				<TouchableOpacity
					style={{ backgroundColor: 'red', height: 20 }}
					onPress={() => this.props.navigation.navigate('Dashboard')}
				>
					<Text style={{ color: 'white' }}> GO TO Dashboard </Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ backgroundColor: 'green', height: 20 }} onPress={this.webServiceCall}>
					<Text style={{ color: 'white', fontWeight: '300' }}> Call API </Text>
				</TouchableOpacity>
			</View>
		);
	}
}
export default HomeScreen;

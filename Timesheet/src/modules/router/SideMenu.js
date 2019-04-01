import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, List, ListItem } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
const routes = [ 'Home', 'Profile', 'TimeSheet', 'Calender', 'Project', 'Log Out' ];

export default class SideMenu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<Content>
					<Image
						source={{
							uri:
								'https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/drawer-cover.png'
						}}
						style={{
							height: 120,
							alignSelf: 'stretch',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					/>
					<List
						dataArray={routes}
						renderRow={(data) => {
							const menuItem = data;
							if (data === 'Log Out') {
								data = 'LoginScreen';
							}
							return (
								<ListItem button onPress={() => this.props.navigation.navigate(data)}>
									<Text>{menuItem}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}

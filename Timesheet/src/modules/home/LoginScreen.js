import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, AsyncStorage } from 'react-native';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	componentDidMount() {
		this._loadInitialState().done();
	}

	_loadInitialState = async () => {
		var value = await AsyncStorage.getItem('user');
		if (value !== null) {
			this.props.navigation.navigate('Home');
		}
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
				<View style={styles.container}>
					<Text style={styles.header}>Login</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Email"
						onChange={(email) => this.setState({ email })}
						underlineColorAndroid="transparent"
					/>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						onChange={(password) => this.setState({ password })}
						underlineColorAndroid="transparent"
					/>
					<TouchableOpacity style={styles.button} onPress={this.login}>
						<Text>Login</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		);
	}

	login = () => {
		fetch('http://94.224.242.254:8000/api/auth/login', {
			method: 'POST',
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.success === true) {
					AsyncStorage.setItem('user', res.user);
					this.props.navigation.navigate('Home');
				} else {
					alert(res.message);
				}
			})
			.done();
	};
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2896d3',
		paddingLeft: 40,
		paddingRight: 40
	},
	header: {
		fontSize: 24,
		marginBottom: 60,
		color: '#fff',
		fontWeight: 'bold'
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fff'
	},
	button: {
		alignSelf: 'stretch',
		backgroundColor: '#01c853',
		padding: 20,
		alignItems: 'center'
	}
});

export default LoginScreen;

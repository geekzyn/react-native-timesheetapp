import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { callAPI } from '../../services/RequestBuilder';
import { LoginAPI } from '../../services/APIConfig';
import { Toast } from 'native-base';
import RequestBody from '../../services/RequestBody';
import { INITIAL_HEADERS } from '../../services/RequestBuilder';
import AppStorage from '../../utils/AppAsyncStorage';
import { Spinner } from '../../utils/Spinner';
import { requestLogin, getAccessTokenFromStorage } from '../login/LoginAction';
import { connect } from 'react-redux';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			password: '',
			username: '',
			response: '',
			accessToken: ''
		};
	}

	componentDidMount() {
		
		this.props.getAccessTokenFromStorage();
	}

	componentWillReceiveProps(nextProps) {
		
		if (typeof nextProps.accessToken === 'string' && nextProps.accessToken !== '') {
			this.props.navigation.navigate('TaskNavigator');
		}
	}

	//------------------------ Login Helper Methods ----------------------//
	// #1
	prepareForLogin() {
		if (this.validateParameters()) {
			const params = { state: this.state, navigation: this.props.navigation };
			this.props.requestLogin(params);
		} else {
			this.showAlert('Please Enter Username and Password Both.');
		}
	}
	// #2
	validateParameters() {
		var { password, username } = this.state;
		isValid = false;
		if (password.length !== 0 && username.length !== 0) {
			isValid = true;
		}
		return isValid;
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
			{ cancelable: false }
		);
	}

	// showData() {
	// 	AppStorage.getValue('accessToken')
	// 		.then((result) => {
	// 			console.log(result);
	// 			
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 			
	// 		});
	// }

	render() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return (
			<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
				<Text style={{ marginTop: 100, fontSize: 30, fontWeight: '800', color: '#0f56b8' }}>Timesheet</Text>

				<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, margin: 30 }}>
					<View style={{ flexDirection: 'row', backgroundColor: '#0f56b8' }}>
						<TextInput
							style={styles.loginTextField}
							placeholder="Email"
							placeholderTextColor={'#738382'}
							onChangeText={(text) => this.setState({ username: text })}
						/>
					</View>
					<View style={{ flexDirection: 'row', backgroundColor: '#0f56b8' }}>
						<TextInput
							style={[ styles.loginTextField, { marginBottom: 30 } ]}
							placeholder="Password"
							placeholderTextColor={'#738382'}
							secureTextEntry={true}
							onChangeText={(text) => this.setState({ password: text })}
						/>
					</View>
				</View>
				<View style={{ flexDirection: 'row', margin: 30 }}>
					<TouchableOpacity style={styles.nextButton} onPress={this.prepareForLogin.bind(this)}>
						<Text style={{ color: 'blue', fontSize: 30, fontWeight: 'bold' }}>LOGIN</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	
	const { loading, isConnected, accessToken } = state.loginReducers;
	return { loading, isConnected, accessToken };
};

const styles = StyleSheet.create({
	loginTextField: {
		height: 50,
		marginLeft: 40,
		marginRight: 40,
		marginTop: 30,
		backgroundColor: 'white',
		alignSelf: 'center',
		fontSize: 20,
		flex: 1
	},
	nextButton: {
		flex: 1,
		height: 50,
		backgroundColor: 'white',
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	}
});

export default connect(mapStateToProps, { requestLogin, getAccessTokenFromStorage })(LoginScreen);

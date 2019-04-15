import React from 'react';
import { View, ActivityIndicator } from 'react-native';

//For Presentational component use functional comp
const Spinner = ({ size }) => {
	// size in definition is the argument
	return (
		//if size is passed use it else make it large.
		<View style={styles.spinnerStyle}>
			<ActivityIndicator size={size || 'large'} />
		</View>
	);
};

const styles = {
	// spinner at center
	spinnerStyle: {
		// full width
		flex: 1,
		// for centering the spinner.
		justifyContent: 'center',
		alignItems: 'center'
	}
};

export { Spinner };

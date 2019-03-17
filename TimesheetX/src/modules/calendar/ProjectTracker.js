import React, {Component} from 'react';
import {View, Text} from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

class ProjectTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: 0
        };
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
                <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { console.log("hi")}}
                />
            </View>
        );
    }
}

export default WithNavigation(ProjectTracker);
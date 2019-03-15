import React, {Component} from 'react';
import {View, Text} from 'react-native';
import WithNavigation from '../../common/HOCs/WithNavigation';

class ProjectTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: 0
        };
    }

    render() {
        return (
            <View style={{backgroundColor: "#0F8B6F"}} >
                <Text style={{alignSelf: "center", color: "white"}}>
                    ProjectTracker
                </Text>
            </View>
        )
    }
}

export default WithNavigation(ProjectTracker);
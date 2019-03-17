import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Sample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sampleData: 0
        };
    }

    render() {
        return (
            <View style={{backgroundColor: "green"}} >
                <Text style={{alignSelf: "center", color: "white"}}>
                    Sample 1
                </Text>
            </View>
        )
    }
}

export default Sample;
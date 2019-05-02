import React, {Component} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import {getTotalTodayEntries, getTotalTodayTime} from '../report/ReportAction';
import {connect} from 'react-redux';

class Report extends Component {

    constructor(prosp) {
        super(prosp);
    }

    componentDidMount() {
        this.props.getTotalTodayEntries(this.props);
    }

    componentWillReceiveProps(nextProps){
        if (typeof nextProps.totalTodayEntries == "number" && nextProps.totalTodayEntries > 0) {
            this.props.getTotalTodayTime(this.props);
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{width: "100%", height: 40, alignItems: 'center'}}>
                    <Text style={{fontSize: 30, color: 'blue', fontWeight:'bold'}}>REPORT</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 40}}>
                    <Text style={{alignSelf: 'flex-start', fontSize: 40, color: 'green', margin: 10, marginRight: 20}}>Total Today Entries:</Text>
                    <Text style={{alignContent: 'flex-end' , fontSize: 40, color: 'green', margin: 10, marginLeft: 20}}>{this.props.totalTodayEntries}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                    <Text style={{alignSelf: 'flex-start', fontSize: 40, color: 'green', margin: 10, marginRight: 20}}>Total Today Time Entries:</Text>
                    <Text style={{alignContent: 'flex-end' , fontSize: 40, color: 'green', margin: 10, marginLeft: 20}}>{this.props.totalEntriesTime}</Text>
                </View>
            </View>
            )
    }
}

const mapStateToProps = (state) => {
	debugger;
    const {totalTodayEntries, totalEntriesTime} = state.reportReducer;
    const { accessToken } = state.loginReducers;

    return {totalTodayEntries, totalEntriesTime, accessToken};
};


export default connect(mapStateToProps, {getTotalTodayEntries, getTotalTodayTime})(Report);
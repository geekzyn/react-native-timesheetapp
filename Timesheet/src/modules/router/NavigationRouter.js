import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from '../home/Home';
import LoginScreen from '../login/LoginScreen';
import Profile from '../consultant/Profile';
import Calender from '../calendar/Calender';
import ProjectTracker from '../calendar/ProjectTracker';
import SideMenu from './SideMenu';
import Timesheet from '../dashboard/Timesheet';
import ProjectList from '../entry/ProjectList';
import ActivityList from '../entry/ActivityList';
import TimeEntry from '../entry/TimeEntry';

const TaskNavigator = createStackNavigator({
	TimeSheet: {
		screen: Timesheet,
		navigationOptions: {
			header: null
		}
	},
	ProjectList: {
		screen: ProjectList
	},
	ActivityList: {
		screen: ActivityList
	},
	TimeEntry: {
		screen: TimeEntry
	}
});

const DashboardDrawerNavigator = createDrawerNavigator(
	{
		TaskNavigator: {
			screen: TaskNavigator
		},
		Profile: {
			screen: Profile
			// navigationOptions: {
			//   header: null,
			// },
		},
		Calender: {
			screen: Calender,
			navigationOptions: {
				header: null
			}
		},
		Project: {
			screen: ProjectTracker,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		contentComponent: (props) => <SideMenu {...props} />
	}
);

const AppNavigator = createStackNavigator(
	{
		LoginScreen: {
			screen: LoginScreen,
			navigationOptions: {
				header: null
			}
		},
		Home: {
			screen: Home
		},
		Dashboard: {
			screen: DashboardDrawerNavigator,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		initialRouteName: 'LoginScreen'
	}
);

export default (AppNav = createAppContainer(AppNavigator));

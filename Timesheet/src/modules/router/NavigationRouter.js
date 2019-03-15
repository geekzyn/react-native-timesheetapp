import React, {Component} from 'react';
import {createStackNavigator, createAppContainer, createDrawerNavigator} from 'react-navigation';
import Home from '../home/Home';
import LoginScreen from '../home/LoginScreen';
import Profile from '../consultant/Profile';
import Calender from '../calendar/Calender';
import ProjectTracker from '../calendar/ProjectTracker';
import SideMenu from './SideMenu';
import Timesheet from '../dashboard/Timesheet';

const DashboardDrawerNavigator = createDrawerNavigator(
  {
    TimeSheet: {
      screen: Timesheet,
      navigationOptions: {
        header: null,
      },
    },
    Profile: {
      screen: Profile,
      // navigationOptions: {
      //   header: null,
      // },
    },
    Calender: {
      screen: Calender,
      navigationOptions: {
        header: null,
      },
    },
    Project: {
      screen: ProjectTracker,
      navigationOptions: {
        header: null,
      },
    },
  },
    {
      contentComponent: props => <SideMenu {...props} />
    }
);

const AppNavigator = createStackNavigator(
    {
      LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
          header: null,
        },
      },
        Home: {
            screen: Home,
      },
      Dashboard: {
        screen: DashboardDrawerNavigator,
        navigationOptions: {
          header: null,
        }
      }
    },
    {
      initialRouteName: "LoginScreen"
    }
  );

  

 

export default AppNav = createAppContainer(AppNavigator);
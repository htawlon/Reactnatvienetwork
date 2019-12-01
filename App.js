import React, {Component} from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Newdata from './components/Newdata'
import Showdata from './components/Showdata'

 
export default class App extends React.Component {
  render(){
    const MyTaps=createBottomTabNavigator({
      Adddata:{
        screen : Newdata,
        navigationOptions:{
          tabBarLabel: "Add Some Data",
           tabBarIcon:({tintColor})=><Icon name="plus-circle" color={tintColor}></Icon>
        },
       
      },
      Showdata:{
        screen: Showdata,
        navigationOptions:{
          tabBarLabel: "Available Data",
          tabBarIcon: ({tintColor})=><Icon name="tags" colcor={tintColor}></Icon>
        }
      }
    },
    {
      initialRouteName: "Showdata",
      

    })
       const AppContainer= createAppContainer(MyTaps)
    return(
      <AppContainer></AppContainer>
    )
  }
}


//This is an example code for Navigator// 
import React, { Component } from 'react';
//import react in our code. 

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import AgentPage from './pages/AgentPage';
//import all the screens we are going to switch 
const App = createStackNavigator({
  //Constant which holds all the screens like index of any book 
  Login: { screen: FirstPage },
  //First entry by default be our first screen if we do not define initialRouteName
  Admin: { screen: SecondPage },
  Agent: { screen: AgentPage },
},
  {
    initialRouteName: 'Login',
  }
);
export default createAppContainer(App);
import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ToDoListScreen from './todo-app/screens/ToDoListScreen';
import ToDoDetailScreen from './todo-app/screens/ToDoDetailScreen';
import { NameScreen } from './todo-app/utils/Constans';
import { Colors } from './todo-app/utils/color/Colors';

const Stack = createStackNavigator();

const App: React.FunctionComponent = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      <Stack.Navigator initialRouteName="ToDoList">
        <Stack.Screen
          name={NameScreen.nameToDoListScreen}
          component={ToDoListScreen}
          options={{
            title: 'My todo list',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
          }}
        />
        <Stack.Screen
          name={NameScreen.nameToDoDetailScreen}
          component={ToDoDetailScreen}
          options={{
            title: 'Todo Detail',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

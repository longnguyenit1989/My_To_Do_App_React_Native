import React, {useMemo} from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ToDoListScreen from './todo-app/screens/ToDoListScreen';
import ToDoDetailScreen from './todo-app/screens/ToDoDetailScreen';
import {NameScreen, TittleToolBarScreen} from './todo-app/utils/Constans';
import {Colors} from './todo-app/utils/color/Colors';
import {createTable} from './todo-app/sqlite/Db';

const Stack = createStackNavigator();

const App: React.FunctionComponent = () => {
  useMemo(() => {
    createTable();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <Stack.Navigator initialRouteName={NameScreen.nameToDoListScreen}>
        <Stack.Screen
          name={NameScreen.nameToDoListScreen}
          component={ToDoListScreen}
          options={{
            title: TittleToolBarScreen.tittleToDoListScreen,
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
            title: TittleToolBarScreen.tittleToDoDetailScreen,
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

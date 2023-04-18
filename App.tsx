import React, {useEffect} from 'react';
import {StatusBar, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ToDoDetailScreen from './todo-app/screens/ToDoDetailScreen';
import ToDoListContainer from './todo-app/screens/to_do_list/ToDoListContainer';
import {NameScreen, TittleToolBarScreen} from './todo-app/utils/Constans';
import {Colors} from './todo-app/utils/color/Colors';
import {createTable} from './todo-app/sqlite/Db';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {appStore} from './todo-app/store/Store';
import {persistStore} from 'redux-persist';

const Stack = createStackNavigator();

const App: React.FunctionComponent = () => {
  const persistor = persistStore(appStore);

  useEffect(() => {
    createTable();
  }, []);

  return (
    <Provider store={appStore}>
      <PersistGate loading={false} persistor={persistor}>
        <NavigationContainer>
          <StatusBar
            backgroundColor={Colors.primary}
            barStyle="light-content"
          />
          <Stack.Navigator initialRouteName={NameScreen.nameToDoListContainer}>
            <Stack.Screen
              name={NameScreen.nameToDoListContainer}
              component={ToDoListContainer}
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
      </PersistGate>
    </Provider>
  );
};

export default App;

import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import ToDoDetailScreen from './todo-app/screens/ToDoDetailScreen';
import ToDoListContainer from './todo-app/screens/to_do_list/ToDoListContainer';
import {
  DrawerNameScreen,
  NameScreen,
  Strings,
  TittleToolBarScreen,
} from './todo-app/utils/Constans';
import {Colors} from './todo-app/utils/color/Colors';
import {createTable} from './todo-app/sqlite/Db';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {appStore} from './todo-app/store/Store';
import {persistStore} from 'redux-persist';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const App: React.FunctionComponent = () => {
  const persistor = persistStore(appStore);

  useEffect(() => {
    createTable();
  }, []);

  return (
    <Provider store={appStore}>
      <PersistGate loading={false} persistor={persistor}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName={DrawerNameScreen.nameDrawerToDoList}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
              name={DrawerNameScreen.nameDrawerToDoList}
              component={StackNavigator}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const StackNavigator = ({navigation}: any) => (
  <Stack.Navigator>
    <Stack.Screen
      name={NameScreen.nameToDoListContainer}
      component={ToDoListContainer}
      options={{
        title: TittleToolBarScreen.tittleToDoListScreen,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Text style={styles.drawerIcon}>≡</Text>
          </TouchableOpacity>
        ),
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
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

const CustomDrawerContent = ({navigation}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Load data to firebase"
        onPress={() => {
          // console.log("Load data to firebase")
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label="Get data from firebase"
        onPress={() => {
          // console.log("Get data from firebase")
          navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 15,
    fontSize: 30,
    color: Colors.white,
  },
});

export default App;

import React from "react";

import ToDoDetailScreen from "../screens/ToDoDetailScreen";
import ToDoListContainer from "../screens/to_do_list/ToDoListContainer";
import { Dimens, NameScreen, TittleToolBarScreen } from "./Constans";
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { Colors } from "./color/Colors";

const Stack = createStackNavigator();

export const StackNavigator = ({navigation}: any) => (
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

  const styles = StyleSheet.create({
    drawerIcon: {
      marginLeft: Dimens.drawerMarginLeft,
      fontSize: Dimens.drawerFontSize,
      color: Colors.white,
    },
  });
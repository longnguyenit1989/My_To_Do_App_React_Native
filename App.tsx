import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import {
  DrawerNameScreen,
  LabelDrawerItem,
  NameCollectionFireBase,
} from './todo-app/utils/Constans';
import {
  createTable,
  deleteAllDbToDoItems,
  getAllToDoItemsFromDb,
  saveMyTodoListToDatabase,
} from './todo-app/sqlite/Db';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {appStore} from './todo-app/store/Store';
import {persistStore} from 'redux-persist';
import dbFirebase from './todo-app/firebase/firebase.config';
import {doc, setDoc, getDoc} from 'firebase/firestore';

import {myToDoActions} from './todo-app/reducers/MyToDoReducer';
import {useAppDispatch} from './todo-app/store/Hook';

import { MyToDo } from './todo-app/entity/MyToDo';
import { StackNavigator } from './todo-app/utils/StackNavigator';

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
            initialRouteName={DrawerNameScreen.nameDrawerNavigator}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
              name={DrawerNameScreen.nameDrawerScreen}
              component={StackNavigator}
              options={{headerShown: false}}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const CustomDrawerContent = ({navigation}: DrawerContentComponentProps) => {
  const _dispatch = useAppDispatch();

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={LabelDrawerItem.load_data_to_firebase}
        onPress={() => {
          getListToDoSqliteAndSetToFireBase();
          navigation.closeDrawer();
        }}
      />
      <DrawerItem
        label={LabelDrawerItem.get_data_from_firebase}
        onPress={() => {
          getListToDoFireBaseAndSetToSqlite();
          navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );

  async function getListToDoSqliteAndSetToFireBase() {
    const listMyToDo = await getAllToDoItemsFromDb();

    const dataToSave = {
      todos: listMyToDo.map(item => ({
        id: item.id,
        name: item.name,
      })),
    };

    setDoc(
      doc(dbFirebase, NameCollectionFireBase.TODO_LIST, 'test'),
      dataToSave,
    );
  }

  async function getListToDoFireBaseAndSetToSqlite() {
    await deleteAllDbToDoItems();
    const docRef = doc(dbFirebase, NameCollectionFireBase.TODO_LIST, 'test');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const myTodoList = docSnap
        .data()
        .todos.map(
          (todo: {name: string; id: number}) => new MyToDo(todo.name, todo.id),
        );
      await saveMyTodoListToDatabase(myTodoList);

      _dispatch(myToDoActions.getListMyToDoFromSqliteIsLoading());
    }
  }
};

export default App;

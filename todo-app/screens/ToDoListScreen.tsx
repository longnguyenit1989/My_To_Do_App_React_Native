import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {MyToDo} from '../entity/MyToDo';

import {Colors} from '../utils/color/Colors';
import DialogInputText from '../utils/dialog/DialogInputText';
import {Dimens, NameScreen, Strings, TypeToast} from '../utils/Constans';
import {
  getAllToDoItemsFromDb,
  insertDbToDoItemById,
  updateDbToDoItemById,
  deleteDbToDoItemById,
} from '../sqlite/Db';
import {pushLocalNotificationCrud} from '../noti/PushNotification';

const ToDoListScreen: FC = () => {
  const navigation = useNavigation();

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [myToDoArray, setMyToDoArray] = useState<MyToDo[]>([]);

  useEffect(() => {
    getAllToDoItemsFromDb((arrayMyToDo: MyToDo[]) => {
      setMyToDoArray(arrayMyToDo);
    });
  }, []);

  const showDialogInputText = () => {
    setDialogVisible(true);
  };

  const hideDialogInputText = () => {
    setDialogVisible(false);
  };

  const showToastInputEmpty = () => {
    Toast.show({
      type: TypeToast.error,
      text1: Strings.error,
      text2: Strings.please_fill_your_todo_name,
    });
  };

  const handleClickOkAddMyToDo = (text: string) => {
    if (text.length === 0) {
      showToastInputEmpty();
      return;
    }
    pushLocalNotificationCrud(
      Strings.notification,
      Strings.you_add_todo_success + text,
    );
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const myToDo = new MyToDo(text, timestampInSeconds);

    insertDbToDoItemById(myToDo);

    setMyToDoArray([...myToDoArray, myToDo]);
    hideDialogInputText();
  };

  const handleClickItemToDo = (item: MyToDo) => {
    navigation.navigate(NameScreen.nameToDoDetailScreen, {
      myToDo: item,
      onUpdate: (updatedToDo: MyToDo) => {
        updateMyToDo(updatedToDo);
      },
      onDelete: () => {
        deleteMyTodo(item);
      },
    });
  };

  const updateMyToDo = (updatedToDo: MyToDo) => {
    updateDbToDoItemById(updatedToDo);

    // update myToDo at myToDoArray
    setMyToDoArray(prevArray => {
      const updatedArray = prevArray.map(existingToDo => {
        if (existingToDo.id === updatedToDo.id) {
          return updatedToDo;
        } else {
          return existingToDo;
        }
      });
      return updatedArray;
    });
  };

  const deleteMyTodo = (needDeleteToDo: MyToDo) => {
    deleteDbToDoItemById(needDeleteToDo);

    // delete myToDo at myToDoArray
    const updatedToDoArray = myToDoArray.filter(
      item => item.id !== needDeleteToDo.id,
    );
    setMyToDoArray(updatedToDoArray);
  };

  const handleClickCancel = () => {
    hideDialogInputText();
  };

  const ListItem: React.FC<{item: MyToDo}> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleClickItemToDo(item)}
        style={styles.containerItemToDo}>
        <View style={styles.circleItemToDo}>
          <Text style={styles.firstCharacterItemToDo}>{item.name[0]}</Text>
        </View>
        <Text style={styles.nameItemToDo}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.containerFlastList}
        data={myToDoArray}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={myToDo => myToDo.id.toString()}
      />

      <SafeAreaView style={styles.containerView}>
        <DialogInputText
          visible={isDialogVisible}
          tittle="Input your todo"
          onPressOk={handleClickOkAddMyToDo}
          onPressCancel={handleClickCancel}
        />

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={showDialogInputText}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>

      <Toast autoHide={true} visibilityTime={2500} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  containerFlastList: {
    paddingHorizontal: Dimens.paddingHorizontalContainer,
  },
  toolbarView: {
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarText: {
    color: Colors.white,
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    fontSize: 30,
    color: Colors.white,
  },
  containerItemToDo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  circleItemToDo: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  firstCharacterItemToDo: {
    fontSize: 16,
    color: Colors.white,
  },
  nameItemToDo: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default ToDoListScreen;

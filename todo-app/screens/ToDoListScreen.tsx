import React, {FC, useState} from 'react';

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

const ToDoListScreen: FC = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [myToDoArray, setMyToDoArray] = useState<MyToDo[]>([]);

  const showDialogInputText = () => {
    setDialogVisible(true);
  };

  const hideDialogInputText = () => {
    setDialogVisible(false);
  };

  const handleClickOk = (text: string) => {
    if (text.length === 0) {
      return;
    }
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const myToDo = new MyToDo(text, timestampInSeconds);
    setMyToDoArray([...myToDoArray, myToDo]);
    // myToDoArray.map((item) => console.log(item))
    hideDialogInputText();
  };

  const handleClickCancel = () => {
    hideDialogInputText();
  };

  const ListItem: React.FC<{item: MyToDo}> = ({item}) => {
    return (
      <View style={styles.containerItemToDo}>
        <View style={styles.circleItemToDo}>
          <Text style={styles.firstCharacterItemToDo}>{item.name[0]}</Text>
        </View>
        <Text style={styles.nameItemToDo}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.toolbarView}>
        <Text style={styles.toolbarText}>My todo list</Text>
      </View>

      <FlatList
        data={myToDoArray}
        renderItem={({item}) => <ListItem item={item} />}
        keyExtractor={myToDo => myToDo.id.toString()}
      />

      <SafeAreaView style={styles.containerView}>
        <DialogInputText
          visible={isDialogVisible}
          tittle="Input your todo"
          onPressOk={handleClickOk}
          onPressCancel={handleClickCancel}></DialogInputText>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={showDialogInputText}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  toolbarView: {
    height: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toolbarText: {
    color: Colors.white,
    fontSize: 18
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
    alignItems: 'center'
  },
  floatingButtonText: {
    fontSize: 30,
    color: Colors.white
  },
  containerItemToDo: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  circleItemToDo: {
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  firstCharacterItemToDo: {
    fontSize: 16,
    color: Colors.white
  },
  nameItemToDo: {
    fontSize: 16,
    color: Colors.black
  },
});

export default ToDoListScreen;
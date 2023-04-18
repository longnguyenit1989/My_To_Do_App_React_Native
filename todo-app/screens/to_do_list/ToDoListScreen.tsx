import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {MyToDo} from '../../entity/MyToDo';

import {Colors} from '../../utils/color/Colors';
import DialogInputText from '../../utils/dialog/DialogInputText';
import {Dimens, NameScreen, Strings, TypeToast} from '../../utils/Constans';
import {RouteParams} from '../ToDoDetailScreen';
import {useAppDispatch} from '../../store/Hook';
import {myToDoActions} from '../../reducers/MyToDoReducer';

interface ToDoListScreenProps {
  isLoading: boolean;
  listMyTodo: Array<MyToDo>;
}

const ToDoListScreen: React.FC<ToDoListScreenProps> = (
  props: ToDoListScreenProps,
) => {
  const navigation = useNavigation();

  const _dispatch = useAppDispatch();

  const [isDialogVisible, setDialogVisible] = useState(false);

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
    _dispatch(myToDoActions.insertDbToDoItemByIdIsLoading(text));
    hideDialogInputText();
  };

  const handleClickItemToDo = (item: MyToDo) => {
    const routeParams: RouteParams = {
      myToDo: item,
    };

    navigation.navigate(NameScreen.nameToDoDetailScreen, routeParams);
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
          <Text style={styles.firstCharacterItemToDo}>
            {item.name[0] ?? ''}
          </Text>
        </View>
        <Text style={styles.nameItemToDo}>{item.name ?? ''}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        style={styles.containerFlastList}
        data={props.listMyTodo}
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

      <View
        style={[
          styles.loadingContainer,
          {display: props.isLoading ? 'flex' : 'none'},
        ]}>
        <View style={styles.loadingBackground}></View>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>

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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBackground: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ToDoListScreen;

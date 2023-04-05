import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {MyToDo} from '../entity/MyToDo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../utils/color/Colors';
import {Dimens, Strings} from '../utils/Constans';
import DialogConfirm from '../utils/dialog/DialogConfirm';

const ToDoDetailScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isDialogUpdateVisible, setDialogUpdateVisible] = useState(false);
  const [isDialogDeleteVisible, setDialogDeleteVisible] = useState(false);

  const route = useRoute();
  const myToDo = (route?.params?.myToDo as MyToDo) || null;

  const showDialogUpdateInputText = () => {
    setDialogUpdateVisible(true);
  };

  const hideDialogUpdateInputText = () => {
    setDialogUpdateVisible(false);
  };

  const showDialogDeleteInputText = () => {
    setDialogDeleteVisible(true);
  };

  const hideDialogDeleteInputText = () => {
    setDialogDeleteVisible(false);
  };

  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <DialogConfirm
        visible={isDialogUpdateVisible}
        tittle={Strings.update}
        message={Strings.do_you_want_update_your_todo}
        onPressOk={hideDialogUpdateInputText}
        onPressCancel={hideDialogUpdateInputText}></DialogConfirm>

      <DialogConfirm
        visible={isDialogDeleteVisible}
        tittle={Strings.delete}
        message={Strings.do_you_want_delete_your_todo}
        onPressOk={hideDialogDeleteInputText}
        onPressCancel={hideDialogDeleteInputText}></DialogConfirm>

      <TextInput
        style={styles.inputTextToDo}
        value={myToDo?.name ?? ''}
        onChangeText={value => setInputText(value)}
        placeholder={'your todo name...'}
        autoFocus={true}
      />

      <TouchableOpacity
        style={styles.touchableOpacityButtonUpDate}
        onPress={showDialogUpdateInputText}>
        <Text style={styles.textButton}>{Strings.update}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableOpacityButtonDelete}
        onPress={showDialogDeleteInputText}>
        <Text style={styles.textButton}>{Strings.delete}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeAreaView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: Dimens.paddingContainer,
  },
  containerButtoniew: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: Colors.blue,
  },
  inputTextToDo: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 5,
    padding: 10,
  },
  touchableOpacityButtonUpDate: {
    marginTop: 30,
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Dimens.sizeTextButton,
  },
  touchableOpacityButtonDelete: {
    marginTop: 20,
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Dimens.sizeTextButton,
  },
  textButton: {
    color: Colors.white,
  },
});

export default ToDoDetailScreen;

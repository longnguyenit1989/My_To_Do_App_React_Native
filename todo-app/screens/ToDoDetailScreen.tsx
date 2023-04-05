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

const ToDoDetailScreen: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const route = useRoute();
  const myToDo = (route?.params?.myToDo as MyToDo) || null;

  return (
    <SafeAreaView style={styles.containerSafeAreaView}>
      <TextInput
        style={styles.inputTextToDo}
        value={myToDo?.name ?? ``}
        onChangeText={value => setInputText(value)}
        placeholder={'your todo name...'}
        autoFocus={true}
      />

      <TouchableOpacity style={styles.touchableOpacityButtonUpDate}>
        <Text style={styles.textButton}>{Strings.update}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touchableOpacityButtonDelete}>
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
  },
  touchableOpacityButtonDelete: {
    marginTop: 20,
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: Colors.white,
  },
});

export default ToDoDetailScreen;

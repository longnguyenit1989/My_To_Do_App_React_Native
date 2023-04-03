import React, {FC, useState} from 'react';
import {colors} from './todo-app/utils/color/colors';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DialogInputText from './todo-app/utils/dialog/dialogInputText';

const App: FC = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  const showDialogInputText = () => {
    setDialogVisible(true);
  };

  const hideDialogInputText = () => {
    setDialogVisible(false);
  };

  const handleClickOk = (text: string) => {
    hideDialogInputText();
    setInputText('');
  };

  const handleClickCancel = () => {
    hideDialogInputText();
    setInputText('');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.toolbarView}>
        <Text style={styles.toolbarText}>My todo list</Text>
      </View>

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
    backgroundColor: colors.white,
  },
  toolbarView: {
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarText: {
    color: colors.white,
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonText: {
    fontSize: 30,
    color: colors.white,
  },
});

export default App;

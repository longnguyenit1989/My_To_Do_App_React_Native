import React from 'react';

import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../color/Colors';
import {Dimens, Strings} from '../Constans';

interface DialogConfirmProps {
  visible: boolean;
  tittle: string;
  message: string;
  tittleOkButton?: string;
  tittleCancelButton?: string;
  onPressOk: () => void;
  onPressCancel: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = (
  props: DialogConfirmProps,
) => {
  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
      <View
        style={styles.containerView}>
        <View style={styles.dialogContainer}>
          <Text style={styles.titleDialog}>{props.tittle}</Text>

          <Text style={styles.messageDialog}>{props.message}</Text>

          <View style={styles.viewHorizontalButton}>
            <TouchableOpacity style={styles.touchableOpacityButtonOk} onPress = {props.onPressOk}>
              <Text style={styles.textButton}>{Strings.ok}</Text>
            </TouchableOpacity>

            <View style={styles.blankView} />

            <TouchableOpacity style={styles.touchableOpacityButtonCancel} onPress = {props.onPressCancel}>
              <Text style={styles.textButton}>{Strings.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray_background_dialog,
  },
  dialogContainer: {
    width: '80%',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleDialog: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.blue,
  },
  messageDialog: {
    fontSize: 16,
    color: Colors.gray,
  },
  viewHorizontalButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  touchableOpacityButtonOk: {
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.blue,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacityButtonCancel: {
    width: Dimens.widthButton,
    height: Dimens.heightButton,
    backgroundColor: Colors.red,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: Colors.white,
    fontSize: Dimens.sizeTextButton,
  },
  blankView: {
    width: Dimens.widthBlankView,
  },
});

export default DialogConfirm;

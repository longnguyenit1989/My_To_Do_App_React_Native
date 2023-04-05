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
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={props.onPressCancel}>
        <View style={styles.dialogContainer}>
          <Text style={styles.titleDialog}>{props.tittle}</Text>

          <Text style={styles.messageDialog}>{props.message}</Text>

          <View style={styles.viewHorizontalButton}>
            <TouchableOpacity style={styles.touchableOpacityButtonOk}>
              <Text style={styles.textButton}>{Strings.ok}</Text>
            </TouchableOpacity>

            <View style={styles.blankView} />

            <TouchableOpacity style={styles.touchableOpacityButtonCancel}>
              <Text style={styles.textButton}>{Strings.cancel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    width: Dimens.blankView,
  },
});

export default DialogConfirm;
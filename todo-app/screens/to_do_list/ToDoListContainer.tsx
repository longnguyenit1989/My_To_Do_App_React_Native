import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  getListMyToDo,
  getListMyToDoIsLoading,
  myToDoActions,
} from '../../reducers/MyToDoReducer';
import {useAppDispatch, useAppSelector} from '../../store/Hook';
import ToDoListScreen from './ToDoListScreen';

const ToDoListContainer: React.FC = () => {
  const _dispatch = useAppDispatch();

  const isLoading = useAppSelector(getListMyToDoIsLoading);
  const listMyToDo = useAppSelector(getListMyToDo);

  useEffect(() => {
    _dispatch(myToDoActions.getListMyToDoFromSqliteIsLoading());
  }, []);

  return (
    <View style={styles.wrapper}>
      <ToDoListScreen isLoading={isLoading} listMyTodo={listMyToDo} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ToDoListContainer;

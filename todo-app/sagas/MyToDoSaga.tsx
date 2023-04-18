import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {MyToDo} from '../entity/MyToDo';
import {myToDoActions} from '../reducers/MyToDoReducer';
import {getAllToDoItemsFromDb, insertDbToDoItemById} from '../sqlite/Db';
import {pushLocalNotificationCrud} from '../noti/PushNotification';
import {Strings} from '../utils/Constans';

function* handleGetListMyToDoFromSqlite(action: PayloadAction) {
  try {
    const listMyToDoResponse: MyToDo[] = yield call(getAllToDoItemsFromDb);
    yield put(myToDoActions.getListMyToDoFromSqliteSuccess(listMyToDoResponse));
  } catch (error) {
    yield put(myToDoActions.getListMyToDoFromSqliteFailed);
  }
}

function* handleInsertToDoToSqlite(action: PayloadAction<string>) {
  pushLocalNotificationCrud(
    Strings.notification,
    Strings.you_add_todo_success + action.payload,
  );
  try {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const myToDo = new MyToDo(action.payload, timestampInSeconds);
    insertDbToDoItemById(myToDo);
    yield put(myToDoActions.insertDbToDoItemByIdSuccess(myToDo))
  } catch (error) {}
}

export function* getListMyToDoSaga() {
  yield takeLatest(
    myToDoActions.getListMyToDoFromSqliteIsLoading.type,
    handleGetListMyToDoFromSqlite,
  );
}

export function* insertMyToDoAtSqliteSaga() {
  yield takeLatest(
    myToDoActions.insertDbToDoItemByIdIsLoading.type,
    handleInsertToDoToSqlite,
  );
}

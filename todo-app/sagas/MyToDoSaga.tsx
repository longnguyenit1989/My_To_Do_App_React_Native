import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {MyToDo} from '../entity/MyToDo';
import {myToDoActions} from '../reducers/MyToDoReducer';
import {
  deleteDbToDoItemById,
  getAllToDoItemsFromDb,
  insertDbToDoItemById,
  updateDbToDoItemById,
} from '../sqlite/Db';
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

function* handleInsertToDoSqlite(action: PayloadAction<string>) {
  try {
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    const myToDo = new MyToDo(action.payload, timestampInSeconds);
    insertDbToDoItemById(myToDo);
    yield put(myToDoActions.insertDbToDoItemByIdSuccess(myToDo));

    pushLocalNotificationCrud(
      Strings.notification,
      Strings.you_add_todo_success + action.payload,
    );
  } catch (error) {
    yield put(myToDoActions.insertDbToDoItemByIdFailed);

    pushLocalNotificationCrud(
      Strings.notification,
      Strings.you_add_todo_failed + action.payload,
    );
  }
}

function* handleUpdateToDoSqlite(actionUpdate: PayloadAction<MyToDo>) {
  try {
    updateDbToDoItemById(actionUpdate.payload);
    yield put(myToDoActions.updateDbToDoItemByIdSuccess(actionUpdate.payload));

    pushLocalNotificationCrud(
      Strings.notification,
      Strings.you_update_todo_success + `${actionUpdate.payload.name}`,
    );
  } catch (error) {
    yield put(myToDoActions.updateDbToDoItemByIdFailed);
  }
}

function* handleDeleteToDoSqlite(actionDelete: PayloadAction<MyToDo>) {
  try {
    deleteDbToDoItemById(actionDelete.payload);
    yield put(myToDoActions.deleteDbToDoItemByIdSuccess(actionDelete.payload));

    pushLocalNotificationCrud(
      Strings.notification,
      Strings.you_delete_todo_success + `${actionDelete.payload?.name ?? ''}`,
    );
  } catch (error) {
    yield put(myToDoActions.deleteDbToDoItemByIdIsFailed);
  }
}

export function* getListMyToDoSaga() {
  yield takeLatest(
    myToDoActions.getListMyToDoFromSqliteIsLoading.type,
    handleGetListMyToDoFromSqlite,
  );
}

export function* insertMyToDoSqliteSaga() {
  yield takeLatest(
    myToDoActions.insertDbToDoItemByIdIsLoading.type,
    handleInsertToDoSqlite,
  );
}

export function* updateMyToDoSqliteSaga() {
  yield takeLatest(
    myToDoActions.updateDbToDoItemByIdIsLoading.type,
    handleUpdateToDoSqlite,
  );
}

export function* deleteMyToDoSqliteSaga() {
  yield takeLatest(
    myToDoActions.deleteDbToDoItemByIdIsLoading.type,
    handleDeleteToDoSqlite,
  );
}

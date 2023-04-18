import {all} from 'redux-saga/effects';
import {
  getListMyToDoSaga,
  insertMyToDoSqliteSaga,
  updateMyToDoSqliteSaga,
  deleteMyToDoSqliteSaga,
} from './MyToDoSaga';

export default function* rootSaga() {
  yield all([
    getListMyToDoSaga(),
    insertMyToDoSqliteSaga(),
    updateMyToDoSqliteSaga(),
    deleteMyToDoSqliteSaga(),
  ]);
}

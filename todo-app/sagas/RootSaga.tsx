import {all} from 'redux-saga/effects';
import {listMyToDoSaga} from './MyToDoSaga';

export default function* rootSaga() {
  yield all([listMyToDoSaga()]);
}

import { all } from "redux-saga/effects";
import {getListMyToDoSaga, insertMyToDoAtSqliteSaga} from "./MyToDoSaga";

export default function* rootSaga() {
    yield all([getListMyToDoSaga(), insertMyToDoAtSqliteSaga()]);
}
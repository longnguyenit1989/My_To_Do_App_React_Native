import SQLite from 'react-native-sqlite-storage';
import {MyToDo} from '../entity/MyToDo';

const databaseParams = {
  name: 'MyDatabase.db',
  version: '1.0',
  displayName: 'My Database',
  size: 200000,
};

const tableName = {
  todo: 'todos',
};

const db = SQLite.openDatabase(databaseParams);

export async function createTable() {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tableName.todo} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`,
      [],
      () => {},
      (error: any) => console.log('Error creating table: ', error),
    );
  });
}

export async function insertDbToDoItemById(item: MyToDo) {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `INSERT INTO ${tableName.todo} (name, id) VALUES (?, ?)`,
      [item.name, item.id.toString()],
      (tx: any, results: any) => {},
      (error: any) => console.log('Error inserting item: ', error),
    );
  });
}

export async function getToDoItemFromDbById(
  id: number,
  callback: (item: MyToDo | null) => void,
) {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `SELECT * FROM ${tableName.todo} WHERE id=?`,
      [id],
      (tx: any, results: {rows: any}) => {
        const rows = results.rows;

        if (rows.length > 0) {
          const row = rows.item(0);
          const item = new MyToDo(row.name, row.id);
          callback(item);
        } else {
          callback(null);
        }
      },
      (error: any) => console.log('Error getting item: ', error),
    );
  });
}

export async function updateDbToDoItemById(item: MyToDo) {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `UPDATE ${tableName.todo} SET name=? WHERE id=?`,
      [item.name, item.id],
      (tx: any, results: any) => {},
      (error: any) => console.log('Error updating item: ', error),
    );
  });
}

export async function deleteDbToDoItemById(needDeleteToDo: MyToDo) {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `DELETE FROM ${tableName.todo} WHERE id=?`,
      [needDeleteToDo.id],
      (tx: any, results: any) => {},
      (error: any) => console.log('Error deleting item: ', error),
    );
  });
}

export async function getAllToDoItemsFromDb(): Promise<MyToDo[]> {
  return new Promise(async (resolve, reject) => {
    (await db).transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM ${tableName.todo}`,
        [],
        (tx: any, results: {rows: any}) => {
          const rows = results.rows;
          const items: MyToDo[] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = rows.item(i);
            const item = new MyToDo(row.name, row.id);
            items.push(item);
          }

          resolve(items);
        },
        (error: any) => reject(error),
      );
    });
  });
}

export async function deleteAllDbToDoItems() {
  (await db).transaction((tx: any) => {
    tx.executeSql(
      `DELETE FROM ${tableName.todo}`,
      [],
      (tx: any, results: any) => {},
      (error: any) => console.log('Error deleting all items: ', error),
    );
  });
}

export async function saveMyTodoListToDatabase(myTodoList: Array<MyToDo>) {
  for (const myTodo of myTodoList) {
    await insertDbToDoItemById(myTodo);
  }
}

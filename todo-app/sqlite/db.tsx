import SQLite from 'react-native-sqlite-storage';
import {MyToDo} from '../entity/MyToDo';

const databaseName = 'MyDatabase.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'My Database';
const databaseSize = 200000;

const db = SQLite.openDatabase(
  databaseName,
  databaseVersion,
  databaseDisplayName,
  databaseSize,
);

export function createTable() {
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
      [],
      () => console.log('Table created successfully.'),
      (error: any) => console.log('Error creating table: ', error),
    );
  });
}

export function insertDbToDoItemById(item: MyToDo) {
  db.transaction((tx: any) => {
    tx.executeSql(
      'INSERT INTO todos (name, id) VALUES (?, ?)',
      [item.name, item.id.toString()],
      (tx: any, results: any) => {
        console.log('Item inserted successfully.');
      },
      (error: any) => console.log('Error inserting item: ', error),
    );
  });
}

export function getToDoItemFromDbById(
  id: number,
  callback: (item: MyToDo | null) => void,
) {
  db.transaction((tx: any) => {
    tx.executeSql(
      'SELECT * FROM todos WHERE id=?',
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

export function updateDbToDoItemById(item: MyToDo) {
  db.transaction((tx: any) => {
    tx.executeSql(
      'UPDATE todos SET name=? WHERE id=?',
      [item.name, item.id],
      (tx: any, results: any) => {
        console.log('Item updated successfully.');
      },
      (error: any) => console.log('Error updating item: ', error),
    );
  });
}

export function deleteDbToDoItemById(needDeleteToDo: MyToDo) {
  db.transaction((tx: any) => {
    tx.executeSql(
      'DELETE FROM todos WHERE id=?',
      [needDeleteToDo.id],
      (tx: any, results: any) => {
        console.log('Item deleted successfully.');
      },
      (error: any) => console.log('Error deleting item: ', error),
    );
  });
}

export function getAllToDoItemsFromDb(callback: (items: MyToDo[]) => void) {
  db.transaction((tx: any) => {
    tx.executeSql(
      'SELECT * FROM todos',
      [],
      (tx: any, results: {rows: any}) => {
        const rows = results.rows;
        const items: MyToDo[] = [];

        for (let i = 0; i < rows.length; i++) {
          const row = rows.item(i);
          const item = new MyToDo(row.name, row.id);
          items.push(item);
        }

        callback(items);
      },
      (error: any) => console.log('Error getting items: ', error),
    );
  });
}

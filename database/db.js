import * as SQLite from 'expo-sqlite';

const DATABASE_NAME = 'myLocationApp.sqlite';

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latitude REAL,
  longitude REAL,
  timestamp TEXT
);`;

let _db = null;

export default function openDB() {
  if (!_db) {
    _db = SQLite.openDatabaseSync(DATABASE_NAME);
    _db.withTransactionSync(() => {
      _db.execSync(SQL_CREATE_TABLE);
    });
  }
  return _db;
}
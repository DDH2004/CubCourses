import sqlite3 from 'sqlite3';
import path from 'path';

// Create a function to open the database
export function getDatabaseConnection() {
  const dbPath = path.resolve(process.cwd(), 'Checkpoint2-dbase.sqlite');

  return new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
    } else {
      console.log('Connected to the SQLite database');
    }
  });
}

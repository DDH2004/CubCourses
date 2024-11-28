import sqlite3, { Database } from 'sqlite3';

// Create a function to open the database
export function getDatabaseConnection() {
  return new sqlite3.Database('/Users/brandon/Downloads/CSEFolders/CSE111 - Databases/CubCourses/Checkpoint3_Items/Checkpoint2-dbase.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
    } else {
      console.log('Connected to the SQLite database');
    }
  });
}

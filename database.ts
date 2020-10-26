/* Using sqlite as an easy db without any configurations and setups.
    on running the server it will try creating user, instruments, lists tables if they dont exist.
    It will populate the instruments table incase it was created.
    Not ideal Database but should serve for this project */
import mockData from './instrumentsMockData';
import _ from 'lodash';
import sqlite3 from 'sqlite3';
// verbose for extra info in debbuging

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, err => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    // create instuments table and fill with data
    db.run(
      `CREATE TABLE instrument (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(41) NOT NULL, 
            symbol VARCHAR(7) NOT NULL,
            instrumentType VARCHAR(9) NOT NULL
            )`,
      err => {
        if (err) {
          if (err.message !== "SQLITE_ERROR: table instrument already exists") {
            console.log(err);
          }
        } else {
          // Table just created, creating some rows
          // incase table was created lets fill it with some mock data
          const insert =
            "INSERT INTO instrument (id, name, symbol, instrumentType) VALUES (?, ?, ?, ?)";
          _.forEach(mockData, inst => {
            db.run(insert, _.values(inst));
          });
        }
      }
    );

    // create users table
    db.run(
      `CREATE TABLE user (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(20) NOT NULL UNIQUE
            )`,
      err => {
        if (err) {
          if (err.message !== "SQLITE_ERROR: table user already exists") {
            console.log(err);
          }
        }
      }
    );
    // create lists table
    db.run(
      `CREATE TABLE list (
            userId INTEGER NOT NULL,
            instrumentId INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES user(id),
            FOREIGN KEY (instrumentId) REFERENCES instrument(id),
            UNIQUE (userId, instrumentId)
            )`,
      err => {
        if (err) {
          if (err.message !== "SQLITE_ERROR: table list already exists") {
            console.log(err);
          }
        }
      }
    );
  }
});

export = db;

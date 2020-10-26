import db from "../database";

export default {
  getUsers() {
    const sql = "select * from user";
    return new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject({ error: err.message });
        }
        resolve({
          message: "success",
          data: rows
        });
      });
    });
  },
  getUserByName(name: string) {
    const sql = "select * from user where name = ?";
    const params = [name];
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject({ error: err.message });
          return;
        }
        if (!row) {
          reject({ status: 404, error: "user not found" });
          return;
        }
        // fetch relevant instruments

        // SHOULD TO JOIN TO FETCH INSTRUMETS
        const sql = `select * from list LEFT JOIN instrument ON list.instrumentId = instrument.id where list.userId = ${row.id}`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject({ error: err.message });
            return;
          }
          resolve({
            message: "success",
            data: { user: row, list: rows }
          });
        });
      });
    });
  },
  postUser(id: number, name: string) {
    const sql = "INSERT INTO user (id, name) VALUES (?, ?)";
    const params = [id, name];
    return new Promise((resolve, reject) => {
      db.run(sql, params, err => {
        if (err) {
          reject({ error: err.message });
          return;
        }
        const sql = "select * from user where name = ?";
        const params = [name];
        db.get(sql, params, (err, row) => {
          if (err) {
            reject({ error: err.message });
            return;
          }
          if (!row) {
            reject({ status: 404, error: "user not found" });
            return;
          }
          resolve({
            message: "success",
            data: row
          });
        });
      });
    });
  }
};

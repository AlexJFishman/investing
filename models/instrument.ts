import db from "../database";

export default {
  getInstruments() {
    return new Promise((resolve, reject) => {
        const sql = "select * from instrument LIMIT 5";
        db.all(sql, [], (err, rows) => {
          if (err) {
           reject({ error: err.message });
            return;
          }
          resolve({
            message: "success",
            data: rows
          });
        });
    });
  },

  getFilteredInstruments(filter: string){
    return new Promise((resolve, reject) => {
        const sql = `select * from instrument where name like '%${filter}%' or symbol like '%${filter}%' LIMIT 5`;
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject({ error: err.message });
            return;
          }
          resolve({
            message: "success",
            data: rows
          });
        });
    });
  },
  getById(id:string) {
    return new Promise((resolve, reject) => {
        const sql = "select * from instrument where id = ?";
        const params = [id];
        db.get(sql, params, (err, row) => {
          if (err) {
            reject({ error: err.message });
            return;
          }
          if (!row) {
            reject({ error: "instrument not found" });
            return;
          }
          resolve({
            message: "success",
            data: row
          });
        });
    });
  }
};

import db from "../database";

export default {
  getListByUserId(userId: string) {
    return new Promise((resolve, reject) => {
        const sql = "select * from list WHERE userId = ?";
        const params = [userId];
        db.all(sql, params, (err, rows) => {
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

  deleteItemFromList(userId: string, instrumentId:string){
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM list WHERE userId = ? AND instrumentId = ?";
        const params = [userId, instrumentId];
        db.run(sql, params, (err) => {
          if (err) {
            reject({ error: err.message });
            return;
          }
         resolve({
            message: "success"
          });
        });
    });
  },
  addItemToList(userId: string, instrumentId:string) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO list (userId, instrumentId) VALUES (?, ?)";
        const params = [userId, instrumentId];
        db.run(sql, params, err => {
          if (err) {
           reject({ error: err.message });
            return;
          }
          resolve({
            message: "success"
          });
        });
    });
  }
};

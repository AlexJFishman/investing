const router = require("express").Router();
const db = require("../../database.js");

router.get("/", (req, res) => {
  const sql = "select * from user";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});

router.get("/:name", (req, res) => {
  const sql = "select * from user where name = ?";
  const params = [req.params.name];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ status: 404, error: "user not found" });
      return;
    }
    // fetch relevant instruments
    const sql = "select * from list where userId = ?";
    const params = [row.id];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      console.log(rows);
      res.json({
        message: "success",
        data: {user: row, list: rows}
      });
    });
  });
});

router.post("/", (req, res, next) => {
  const sql = "INSERT INTO user (id, name) VALUES (?, ?)";
  const params = [req.body.id, req.body.name];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const sql = "select * from user where name = ?";
    const params = [req.body.name];
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (!row) {
        res.status(404).json({ status: 404, error: "user not found" });
        return;
      }
      res.json({
        message: "success",
        data: row
      });
    });
  });
});

module.exports = router;

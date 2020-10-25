const router = require("express").Router();
const db = require("../../database.js");

router.get("/", (req, res) => {
  const sql = "select * from list";
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

router.get("/:userId", (req, res) => {
  const sql = "select * from list WHERE userId = ?";
  const params = [req.params.userId];
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

router.delete("/", (req, res, next) => {
    const sql = "DELETE FROM list WHERE userId = ? AND instrumentId = ?";
    const params = [req.body.userId, req.body.instrumentId];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success"
      });
    });
  });

router.post("/", (req, res, next) => {
    const sql = "INSERT INTO list (userId, instrumentId) VALUES (?, ?)";
    const params = [req.body.userId, req.body.instrumentId];
    db.run(sql, params, function(err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success"
      });
    });
  });

module.exports = router;

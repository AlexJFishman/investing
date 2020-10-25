const router = require("express").Router();
const db = require("../../database.js");

router.get("/", (req, res) => {
  const sql = "select * from instrument LIMIT 5";
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

router.get("/search/:filter", (req, res) => {
    const filter = req.params.filter;
    const sql = `select * from instrument where name like '%${filter}%' or symbol like '%${filter}%' LIMIT 5`;
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

router.get("/:id", (req, res) => {
  const sql = "select * from instrument where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "instrument not found" });
      return;
    }
    res.json({
      message: "success",
      data: row
    });
  });
});

module.exports = router;

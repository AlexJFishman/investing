import db from '../../database';
import { Router, Request, Response } from 'express';
const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  const sql = "select * from instrument LIMIT 5";
  db.all(sql, [], (err, rows) => {
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

router.get("/search/:filter", (req: Request, res: Response) => {
    const filter = req.params.filter;
    const sql = `select * from instrument where name like '%${filter}%' or symbol like '%${filter}%' LIMIT 5`;
    db.all(sql, [], (err, rows) => {
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

router.get("/:id", (req: Request, res: Response) => {
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

export = router;

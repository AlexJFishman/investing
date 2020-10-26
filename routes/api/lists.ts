import db from '../../database';

import { Router, Request, Response } from 'express';
const router: Router = Router();


router.get("/", (req: Request, res: Response) => {
  const sql = "select * from list";
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

router.get("/:userId", (req: Request, res: Response) => {
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

router.delete("/", (req: Request, res: Response, next) => {
    const sql = "DELETE FROM list WHERE userId = ? AND instrumentId = ?";
    const params = [req.body.userId, req.body.instrumentId];
    db.run(sql, params, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success"
      });
    });
  });

router.post("/", (req: Request, res: Response, next) => {
    const sql = "INSERT INTO list (userId, instrumentId) VALUES (?, ?)";
    const params = [req.body.userId, req.body.instrumentId];
    db.run(sql, params, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success"
      });
    });
  });

export = router;

import db from "../../database";
import listModel from "../../models/list";
import { Router, Request, Response } from "express";
const router: Router = Router();

router.get("/:userId", async (req: Request, res: Response) => {
  let result;
  try {
    result = await listModel.getListByUserId(req.params.userId);
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  res.json(result);
});

router.delete("/", async (req: Request, res: Response, next) => {
  let result;
  try {
    result = await listModel.deleteItemFromList(
      req.body.userId,
      req.body.instrumentId
    );
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);
});

router.post("/", async (req: Request, res: Response, next) => {
  let result;
  try {
    result = await listModel.addItemToList(
      req.body.userId,
      req.body.instrumentId
    );
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);
});

export = router;

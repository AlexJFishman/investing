import db from "../../database";
import userModel from "../../models/user";
import { Router, Request, Response } from "express";
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  let usersResult;
  try {
    usersResult = await userModel.getUsers();
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json(usersResult);
});

router.get("/:name", async (req: Request, res: Response) => {
  let result;
  try {
    result = await userModel.getUserByName(req.params.name);
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
  return res.json(result);
});

router.post("/", async (req: Request, res: Response, next) => {
  let result;
  try {
    result = await userModel.postUser(req.body.id, req.body.name);
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);
});

export = router;

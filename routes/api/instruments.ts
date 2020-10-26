import db from '../../database';
import { Router, Request, Response } from 'express';
import instrumentModel from '../../models/instrument';
const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  let result;
  try {
    result = await instrumentModel.getInstruments();
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);
});

router.get("/search/:filter", async (req: Request, res: Response) => {
  let result;
  try {
    result = await instrumentModel.getFilteredInstruments(req.params.filter);
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);

});

router.get("/:id", async (req: Request, res: Response) => {
  let result;
  try {
    result = await instrumentModel.getById(req.params.id);
  } catch (err) {
    res.status(err.status || 500).json(err.error);
  }
  return res.json(result);
});

export = router;

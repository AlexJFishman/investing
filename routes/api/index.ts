import { Router } from 'express';
import usersRouter from './users';
import instrumentsRouter from './instruments';
import listsRouter from './lists';
const router: Router = Router();

router.use("/users",usersRouter);
router.use("/instruments", instrumentsRouter);
router.use("/lists", listsRouter);

export = router;

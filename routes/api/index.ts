import { Router } from 'express';
const router: Router = Router();

router.use("/users", require("./users"));
router.use("/instruments", require("./instruments"));
router.use("/lists", require("./lists"));

export = router;

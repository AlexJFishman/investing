import { Router } from "express";
const router: Router = Router();

router.use("/api", require("./api"));

export = router;

import express from 'express';

const router = express.Router();
router.use("/users", require("./users"));
router.use("/instruments", require("./instruments"));
router.use("/lists", require("./lists"));

export = router;

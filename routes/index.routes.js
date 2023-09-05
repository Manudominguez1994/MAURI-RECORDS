const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const  authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const  userRouter = require("./user.routes")
router.use("/user", userRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

const vinylRoutes = require("./vinyl.routes");
router.use("/vinyl", vinylRoutes);

const operationRoutes = require("./operation.routes");
router.use("/operation", operationRoutes);

module.exports = router;

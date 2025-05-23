import express from "express";
import {
  allUsers,
  login,
  logout,
  signup,
  test,
} from "../controller/user.controller.js";
import secureRoute from "../middleware/secureRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.get("/allusers", secureRoute, allUsers);
router.get("/allusers", allUsers);
router.get("/test",test)

export default router;

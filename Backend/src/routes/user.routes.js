import { Router } from "express";
import { verifyJWT_email, verifyJWT_username } from "../middlewares/verifyJWT.middleware.js";
import {
  UserDetails,
  UnRegisteredUserDetails,
  saveRegUnRegisteredUser,
  saveEduUnRegisteredUser,
  saveAddUnRegisteredUser,
  registerUser,
  userDetailsWithoutID,
  saveRegRegisteredUser,
  saveEduRegisteredUser,
  saveAddRegisteredUser,
  uploadPic,
  discoverUsers,
  sendScheduleMeet,
  scheduleMeet,
  searchUserByName
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// save and register unregistered user details
router.route("/unregistered/getDetails").get(verifyJWT_email, UnRegisteredUserDetails);
router.route("/unregistered/saveRegDetails").post(verifyJWT_email, saveRegUnRegisteredUser);
router.route("/unregistered/saveEduDetail").post(verifyJWT_email, saveEduUnRegisteredUser);
router.route("/unregistered/saveAddDetail").post(verifyJWT_email, saveAddUnRegisteredUser);
router.route("/registerUser").post(verifyJWT_email, registerUser);

// update user details
router.route("/registered/saveRegDetails").post(verifyJWT_username, saveRegRegisteredUser);
router.route("/registered/saveEduDetail").post(verifyJWT_username, saveEduRegisteredUser);
router.route("/registered/saveAddDetail").post(verifyJWT_username, saveAddRegisteredUser);
// router.route("/registered/updateDetails").post(verifyJWT_username, updateRegisteredUser);

// Upload Picture
router.route("/uploadPicture").post(verifyJWT_username, upload.fields([{ name: "picture", maxCount: 1 }]), uploadPic);

// get user details
router.route("/registered/getDetails/:username").get(verifyJWT_username, UserDetails);
router.route("/registered/getDetails").get(verifyJWT_username, userDetailsWithoutID);

// get profiles for discover page
router.route("/discover").get(verifyJWT_username, discoverUsers);

// send schedule meet email
router.route("/sendScheduleMeet").post(verifyJWT_username, sendScheduleMeet);
router.route("/scheduleMeet").get(scheduleMeet);

// search user by name
router.route("/searchUser").get(verifyJWT_username, searchUserByName);

export default router;

import express from "express";
import multer from "multer"; 
import {
  createProperty,
  deleteProperty,
  getPropertyById,
  getProperties,
  updateProperty,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(getProperties).post(protect, admin, upload.array("images", 10), createProperty);
router
  .route("/:id")
  .get(getPropertyById)
  .put(protect, admin, upload.array("images", 10), updateProperty)
  .delete(protect, admin, deleteProperty);

export default router;

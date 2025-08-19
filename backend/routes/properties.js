import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  createProperty,
  deleteProperty,
  getPropertyById,
  getProperties,
  updateProperty,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
// import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// --- Multer Configuration for Image Uploads ---
// This tells multer to store uploaded files in memory.
// We can then process them in the controller.


router
.route("/")
.get(getProperties)
.post(protect, admin, upload.array("images",3),createProperty);
router
  .route("/:id")
  .get(getPropertyById)
  .put(protect, admin,upload.array("images",3), updateProperty)
  .delete(protect, admin, deleteProperty);

export default router;

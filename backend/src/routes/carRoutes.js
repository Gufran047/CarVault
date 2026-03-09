import express from 'express';
import upload from "../middleware/upload.js";

import {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  countByStatus,
  toggleStatus
} from '../controllers/carController.js';

const router = express.Router();

// GET routes
router.get('/', getCars);
router.get('/countByStatus', countByStatus);
router.get('/:id', getCarById);

// POST (WITH multer)
router.post("/", upload.single("image"), addCar);

// PUT (WITH multer)
router.put("/:id", upload.single("image"), updateCar);

// DELETE
router.delete('/:id', deleteCar);

// PATCH
router.patch('/:id/toggleStatus', toggleStatus);

export default router;
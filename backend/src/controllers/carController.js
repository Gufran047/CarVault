// controllers/carController.js
import Car from "../models/Car.js";

// Create a new car
export const addCar = async (req, res) => {
  try {
    const newCar = new Car({
      ...req.body,
      image: req.file ? req.file.filename : null
    });

    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all cars with filters, pagination and sorting
export const getCars = async (req, res) => {
  try {
    const {
      search,
      brand,
      model,
      status,
      fuelType,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;

    const filter = {};

    // 🔍 GLOBAL SEARCH (brand + model)
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: "i" } },
        { model: { $regex: search, $options: "i" } }
      ];
    }

    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (model) filter.model = { $regex: model, $options: "i" };
    if (status) filter.status = status;
    if (fuelType) filter.fuelType = fuelType;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const pageNumber = Math.max(1, Number(page));
    const limitNumber = Math.max(1, Number(limit));

    const sortOption = {
      [sortBy]: order === "asc" ? 1 : -1
    };

    const cars = await Car.find(filter)
      .sort(sortOption)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Car.countDocuments(filter);

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      cars
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single car
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);

  } catch (err) {
    res.status(500).json({ error: "Invalid car ID" });
  }
};

// Update car
export const updateCar = async (req, res) => {
  try {

    if (req.file) {
      req.body.image = req.file.filename;
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(updatedCar);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete car
export const deleteCar = async (req, res) => {
  try {

    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Count cars by status (aggregation)
export const countByStatus = async (req, res) => {
  try {

    const counts = await Car.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = {
      Available: 0,
      Sold: 0
    };

    counts.forEach(c => {
      formatted[c._id] = c.count;
    });

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle car status
export const toggleStatus = async (req, res) => {
  try {

    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    car.status = car.status === "Available" ? "Sold" : "Available";

    await car.save();

    res.json(car);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
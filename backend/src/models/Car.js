import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },

  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric'],
    required: true
  },

  transmission: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },

  color: { type: String, required: true },

  status: {
    type: String,
    enum: ['Available', 'Sold'],
    default: 'Available'
  },

  image: { type: String }

}, { timestamps: true });

export default mongoose.model('Car', carSchema);
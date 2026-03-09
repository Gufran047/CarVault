import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreateCarPage = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuelType: "",
    transmission: "",
    color: "",
    status: "Available",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append("image", image);
      }

      await api.post("/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Car created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Cars
          </Link>

          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">

              <h2 className="card-title text-2xl mb-4">
                Create New Car
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Brand */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Brand</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter brand"
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Model */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Model</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter model"
                    value={form.model}
                    onChange={(e) =>
                      setForm({ ...form, model: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Year */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Year</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Enter year"
                    value={form.year}
                    onChange={(e) =>
                      setForm({ ...form, year: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Price */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Enter price"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Fuel Type Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fuel Type</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={form.fuelType}
                    onChange={(e) =>
                      setForm({ ...form, fuelType: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>

                {/* Transmission Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Transmission</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={form.transmission}
                    onChange={(e) =>
                      setForm({ ...form, transmission: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                {/* Color */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Color</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Enter color"
                    value={form.color}
                    onChange={(e) =>
                      setForm({ ...form, color: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Status Dropdown */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>

                {/* Image */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Car Image</span>
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Car"}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateCarPage;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2, ArrowLeftIcon } from "lucide-react";

const CarDetailPage = () => {
  const [car, setCar] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/cars/${id}`);
        setCar(res.data);
      } catch {
        toast.error("Failed to fetch car");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSave = async () => {
    if (!car.brand || !car.model || !car.year || !car.price) {
      toast.error("Fill required fields");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("brand", car.brand);
      formData.append("model", car.model);
      formData.append("year", car.year);
      formData.append("price", car.price);
      formData.append("fuelType", car.fuelType || "");
      formData.append("transmission", car.transmission || "");
      formData.append("color", car.color || "");
      formData.append("status", car.status || "");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.put(`/cars/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Car updated");
      navigate("/");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const imageUrl = car?.image
    ? `http://localhost:5000/uploads/${car.image}`
    : null;

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        {/* Top Buttons */}
        <div className="flex justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5" />
            Back
          </Link>

          <button onClick={handleDelete} className="btn btn-error btn-outline">
            <Trash2 className="h-5 w-5" />
            Delete
          </button>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">

            {/* Image */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="car"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}

            {/* Upload Image */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Change Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>

            {/* Brand */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                className="input input-bordered"
                value={car.brand || ""}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
              />
            </div>

            {/* Model */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Model</span>
              </label>
              <input
                className="input input-bordered"
                value={car.model || ""}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
              />
            </div>

            {/* Year */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Year</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={car.year || ""}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
              />
            </div>

            {/* Price */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                value={car.price || ""}
                onChange={(e) => setCar({ ...car, price: e.target.value })}
              />
            </div>

            {/* Fuel Type */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Fuel Type</span>
              </label>
              <select
                className="select select-bordered"
                value={car.fuelType || ""}
                onChange={(e) =>
                  setCar({ ...car, fuelType: e.target.value })
                }
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Transmission</span>
              </label>
              <select
                className="select select-bordered"
                value={car.transmission || ""}
                onChange={(e) =>
                  setCar({ ...car, transmission: e.target.value })
                }
              >
                <option value="">Select Transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Color */}
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Color</span>
              </label>
              <input
                className="input input-bordered"
                value={car.color || ""}
                onChange={(e) => setCar({ ...car, color: e.target.value })}
              />
            </div>

            {/* Status */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                className="select select-bordered"
                value={car.status || ""}
                onChange={(e) =>
                  setCar({ ...car, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <button
              className="btn btn-success"
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
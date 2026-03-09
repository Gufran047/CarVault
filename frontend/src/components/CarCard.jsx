import { Link, useLocation, useNavigate } from "react-router";
import { Trash2, Edit2, Car, Repeat } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const CarCard = ({ car, setCars }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === `/cars/${car._id}`;

  const imageUrl = car.image
    ? `http://localhost:5000/uploads/${car.image}`
    : null;

  // DELETE
  const handleDelete = async () => {
    try {
      await api.delete(`/cars/${car._id}`);
      setCars((prev) => prev.filter((c) => c._id !== car._id));
      toast.success("Car Deleted Successfully");
    } catch (err) {
      toast.error("Failed to delete car");
    } finally {
      setShowModal(false);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (e) => {
    e.preventDefault();

    try {
      const res = await api.patch(`/cars/${car._id}/toggleStatus`);

      setCars((prev) =>
        prev.map((c) =>
          c._id === car._id ? { ...c, status: res.data.status } : c
        )
      );

      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <Link
        to={`/cars/${car._id}`}
        className={`relative block rounded-xl bg-base-100 p-4 border transition-all duration-200
        ${isActive ? "border-primary shadow-lg" : "border-base-300"}
        hover:border-primary hover:shadow-xl`}
      >
        {/* IMAGE */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={car.brand}
            className="w-full h-40 object-cover rounded-md"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="w-full h-40 bg-base-200 rounded-md flex items-center justify-center">
            <div className="text-center text-base-content/40">
              <Car className="size-10 mx-auto mb-1" />
              <p className="text-xs">No Image</p>
            </div>
          </div>
        )}

        {/* TOP ROW */}
        <div className="flex justify-between items-start mt-2">
          <p className="text-xs text-base-content/60 truncate">{car._id}</p>

          <span
            className={`badge ${
              car.status === "Available"
                ? "badge-success"
                : "badge-error"
            }`}
          >
            {car.status}
          </span>
        </div>

        {/* CAR INFO */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Car className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">
              {car.brand} {car.model} ({car.year})
            </p>
          </div>

          <div className="text-sm text-base-content/70">
            Price: ₹{car.price}
          </div>

          <div className="text-sm text-base-content/70">
            {car.fuelType} | {car.transmission} | {car.color}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-4 flex justify-end items-center gap-4">

          {/* TOGGLE STATUS */}
          <div className="tooltip" data-tip="Toggle Status">
            <button
              onClick={toggleStatus}
              className="text-info hover:scale-110 transition"
            >
              <Repeat className="size-4" />
            </button>
          </div>

          {/* EDIT */}
          <div className="tooltip tooltip-warning" data-tip="Edit Car">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/cars/${car._id}`);
              }}
              className="text-warning hover:scale-110 transition"
            >
              <Edit2 className="size-4" />
            </button>
          </div>

          {/* DELETE */}
          <div className="tooltip tooltip-error" data-tip="Delete Car">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="text-error hover:scale-110 transition"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* DELETE MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" /> Delete Car
            </h3>

            <p className="text-base-content/80">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {car.brand} {car.model}
              </span>
              ?
              <br />
              This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default CarCard;
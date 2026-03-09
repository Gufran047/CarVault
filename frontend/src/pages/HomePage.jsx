import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios";
import toast from "react-hot-toast";
import CarCard from "../components/CarCard.jsx";
import CarNotFound from "../components/CarNotFound.jsx";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  const [counts, setCounts] = useState({
    Available: 0,
    Sold: 0,
  });

  const [page, setPage] = useState(1);
  const limit = 6;

  // FETCH CARS
  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await api.get("/cars", {
        params: {
          brand: search,
          fuelType,
          sortBy,
          page,
          limit,
        },
      });

      setCars(res.data.cars || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  // FETCH STATUS COUNT
  const fetchCounts = async () => {
    try {
      const res = await api.get("/cars/countByStatus");
      setCounts(res.data);
    } catch (error) {
      console.error("Count error", error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchCounts();
  }, [search, fuelType, sortBy, page]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">

        {/* STATUS DASHBOARD */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Available Cars</div>
            <div className="stat-value text-success">{counts.Available}</div>
          </div>

          <div className="stat bg-base-100 rounded-lg shadow">
            <div className="stat-title">Sold Cars</div>
            <div className="stat-value text-error">{counts.Sold}</div>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search brand..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {/* FUEL FILTER */}
          <select
            className="select select-bordered"
            value={fuelType}
            onChange={(e) => {
              setFuelType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          {/* SORT */}
          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest</option>
            <option value="price">Price</option>
            <option value="year">Year</option>
          </select>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* NO CARS */}
        {!loading && cars.length === 0 && <CarNotFound />}

        {/* CAR GRID */}
        {!loading && cars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} setCars={setCars} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <button className="btn btn-sm btn-primary">{page}</button>

          <button
            className="btn btn-sm"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
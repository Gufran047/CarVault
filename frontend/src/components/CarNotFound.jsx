// CarNotFound.jsx
import { Car } from "lucide-react";
import { Link } from "react-router";
import React from "react";

const CarNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <Car className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No cars yet</h3>
      <p className="text-base-content/70">
        Ready to add cars? Add your first car to the CarVault.
      </p>
      <Link to="/create" className="btn btn-primary">
        Add First Car
      </Link>
    </div>
  );
};

export default CarNotFound;
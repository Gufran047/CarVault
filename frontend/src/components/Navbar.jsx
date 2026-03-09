import { Link } from "react-router";
import { PlusIcon, Car } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary tracking-wide"
          >
            <Car className="size-6" />
            CARVAULT
          </Link>

          {/* ACTION BUTTON */}
          <Link
            to="/create"
            className="btn btn-primary btn-sm flex items-center gap-2"
          >
            <PlusIcon className="size-4" />
            New Car
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
import React from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link } from 'react-router';

function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 lg:px-20">
      <Link to="/">
        <h1 className="text-2xl font-semibold">
          Luma<span className="text-primary">Circle</span>
        </h1>
      </Link>
      <Link
        to="#"
        className="border-secondary bg-secondary hover:text-secondary flex items-center gap-4 rounded-full border px-4 py-2 text-white hover:bg-transparent"
      >
        <BiLogIn className="text-2xl" />
        <h1 className="font-semibold">Login</h1>
      </Link>
      {/* <div className="relative">
      <Link to="#">
          <div className="bg-primary rounded-full px-3 py-2 text-white">
            <h1 className="text-xl font-semibold">TE</h1>
          </div>
        </Link>
      <nav className="absolute top-16 right-0 z-10 flex flex-col items-start gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-slate-600 shadow-lg">
          <Link to="#" className="w-full">
            Leaderboards
          </Link>
          <button className="w-full border-t border-t-slate-700 pt-2 text-start">
            Logout
          </button>
        </nav>
      </div> */}
    </div>
  );
}

export default Navbar;

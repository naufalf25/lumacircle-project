import React from 'react';
import { Link } from 'react-router';

function LoggedIn() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-xl font-semibold tracking-wide md:text-2xl">
        You are logged In!
      </h1>
      <Link
        to="/"
        className="border-primary bg-primary hover:text-primary rounded-lg border px-6 py-2 text-center font-semibold text-white hover:bg-transparent"
      >
        Go to Homepage
      </Link>
    </div>
  );
}

export default LoggedIn;

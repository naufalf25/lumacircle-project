import React from 'react';
import { Link } from 'react-router';

function ThreadLists() {
  return (
    <div className="w-full md:w-2/3">
      <Link to="#" className="group">
        <div className="w-full rounded-xl bg-white p-4 shadow-lg group-hover:shadow-none md:p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary rounded-full px-2 py-1 text-white">
              <p className="font-semibold">TE</p>
            </div>
            <p className="font-semibold">Test 123 User</p>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700">
              #diskusi
            </p>
            <p className="rounded-md border border-slate-700 px-2 py-1 text-sm text-slate-700">
              #lorem
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus,
              sunt.
            </h2>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              qui facere a atque sint tempora delectus velit natus illum
              officiis obcaecati quia doloremque, praesentium suscipit inventore
              ut repellendus ipsa facilis? Ab quibusdam sapiente consequatur
              cumque incidunt, magnam in illum placeat.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ThreadLists;

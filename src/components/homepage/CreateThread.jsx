import React from 'react';
import Button from '../Button';

function CreateThread() {
  return (
    <div className="mb-4 flex w-full items-center justify-between gap-2 rounded-lg bg-white px-4 py-3 shadow-lg lg:px-10">
      <p className="text-slate-400">
        Do you have something to share for everyone?
      </p>
      <Button className="bg-primary border-primary hover:text-primary rounded-lg border px-2 py-1 text-xl font-semibold text-white hover:bg-transparent">
        + NEW
      </Button>
    </div>
  );
}

export default CreateThread;

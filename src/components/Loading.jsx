import React from 'react';

function Loading() {
  return (
    <div className="flex min-h-40 w-full items-center justify-center gap-4">
      <img src="/loading.gif" alt="loader" className="w-20" />
      <p className="text-lg font-semibold md:text-xl lg:text-2xl">Loading...</p>
    </div>
  );
}

export default Loading;
